const express = require("express");
const app = express();
const connectToDb = require("./connection/config");
const Stuff = require("./model/stuff_model");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
app.use(express.json());
const cors = require('cors');
app.use(cors());


if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
connectToDb();
app.get("/",async (req, res) => {

   await res.status(200).json({ message: "server has started" });
});


app.post("/giris",async(req,res)=>{
  const {username,password}=req.body;
  if(username==process.env.USER&&password==process.env.PASSWORD){
    const token = jwt.sign({ username }, process.env.SECRETKEY, { expiresIn: process.env.JWTINN });
    return res.json({token});
  };
  return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre.' });
});
const authjwt = (req, res, next) => {
    const token = req.header('giris');

    if (!token) {
        return res.status(403).json({ message: 'Erişim engellendi. Token gerekli.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''),  process.env.SECRETKEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
};

app.post("/ekle", authjwt,async (req, res) => {
    try {
        const { barkod, isim, fiyat, adet } = req.body;
        const stuff = new Stuff({ barkod: barkod, isim: isim, fiyat: fiyat, adet: adet });
        await stuff.save();
        res.status(200).json({ message: "kaydedildi" });
    } catch (error) {
        res.status(200).json({ message: "kaydedilmedi" });
    }
});
app.delete("/delete", authjwt,async (req, res) => {
    try {
        const barkod = req.body;
        await Stuff.findOneAndDelete(barkod);

        res.status(200).json({ message: "silindi" });
    } catch (error) {
        res.status(200).json({ message: "silinemedi" });
    }
});
app.put("/guncelle",authjwt, async (req, res) => {
    try {

        const { barkod, isim, fiyat, adet } = req.body;
        const stuff = await Stuff.findOneAndUpdate({ barkod }, { isim, fiyat, adet }, { new: true });
        if (!stuff) {
            return res.status(404).json({ message: "bulunamadı" });
        }
        res.status(200).json({ message: "güncellendi" });
    } catch (error) {
        res.status(200).json({ message: "güncellenemedi" });

    }


});
app.get("/listele",authjwt, async (req, res) => {

    const stufs = await Stuff.find();
    res.status(200).json({ stufs });

});

app.get("/satış",authjwt, async (req, res) => {
    try {
        const { barkod } = req.body;
        const urun = await Stuff.findOne({ barkod: barkod });

        if (urun) {
            res.status(200).json({ message: urun });
        } else {
            res.status(404).json({ message: "Ürün bulunamadı" });
        }
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu", error: error.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log("server just started");
});