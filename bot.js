const { Telegraf } = require('telegraf')
const axios = require('axios');

const bot = new Telegraf("1703380947:AAHOI8SZi7ry-yEoTk8l3ppO4BLEgH0z2zc")

// variabell global
    let pinguinid = -1001282394012
  let crytoupdateid = -1001200275036
  let chanelChatid = [pinguinid,crytoupdateid]
  
 // Tanggal Otomatis
let namaBulan= ['Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
let namaHari =['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu']

let date = new Date();
let tanggal = date.getDate();
let hari = date.getDay()
let bulan = date.getMonth()
let tahun =date.getFullYear()

let tanggalSaatIni = `${namaHari[hari]} , ${tanggal} ${namaBulan[bulan]} ${tahun}`

    
bot.start((ctx) => { 
  //ctx.reply(`hello ${ctx.chat.username}`)
  bot.telegram.sendMessage(ctx.chat.id,`hello ${ctx.chat.username}`)
    mainMenu(ctx);
});

function mainMenu(ctx) {
     //ctx.deleteMessage();
      bot.telegram.sendMessage(ctx.chat.id,"Menu Dasboard",{
       reply_markup:{
         keyboard:[
          [
      {text :'Posting 📝'},
      {text :'Coin Trend 🔎'},
      {text :'Cancel ↩️'}
            
          ]
                  ],
            resize_keyboard: true,
            one_time_keyboard :true
                    }
       
       
      //penutup sendMessage 
     });
}

bot.hears('Cancel ↩️',  (ctx)=>{
   // ctx.deleteMessage();
    mainMenu(ctx);
        
  
});

  bot.hears('Main Menu ♻️', (ctx)=>{
    //  ctx.deleteMessage();
    mainMenu(ctx)
  
});



//Kirim Postingan
  bot.hears('Posting 📝', (ctx) => {
      //ctx.deleteMessage();
     bot.telegram.sendMessage(ctx.chat.id,"Silahkan Pilih Jenis Postingan",{
       reply_markup:{
         keyboard:[
          [
      {text :'Kirim Text'},
      {text :'Kirim Photo'},
      {text :'Cancel ↩️'}
            
          ]
                  ],
            resize_keyboard: true,
            one_time_keyboard :true
                    }
       
       
      //penutup sendMessage 
     });
     
     
    //console.log(ctx.chat.id)
    //penutup command
  });



  
bot.hears('Kirim Text', (ctx)=>{
  //ctx.deleteMessage();
  ctx.reply('Silahkan Kirim Text Anda')
  
    bot.on('text',(ctx) => {
      ctx.reply('☑️ Pesan Terkirim ')
      
            
  let chat = ctx.message.text
      chanelChatid.forEach((e)=> {
      bot.telegram.sendMessage(e,chat)
      });
    
      // penutup on
    });
  
});

bot.hears('Kirim Photo', (ctx)=>{
  //ctx.deleteMessage();
  ctx.reply('Silahkan Kirim Photo Anda')
  
    bot.on('photo',(ctx) => {
      ctx.reply(`
      ☑️ Photo Terkirim... Tunggu Beberapa Saat Untuk Proses Upload ... `)
     let fileid = ctx.message.photo[0]['file_id']
    let capmode = {
    caption: ctx.message.caption,
    parse_mode: 'MarkdownV2'
                  }
    
     // console.log(ctx)
     chanelChatid.forEach((e)=> {
        if(!ctx.message.caption ){
         bot.telegram.sendPhoto(e,fileid)
          }else{

        bot.telegram.sendPhoto(e,fileid,capmode)}
     });
      // penutup on
    });
  
});


// postingan End 


//coin tranding 
bot.hears('Coin Trend 🔎', async(ctx)=>{
    let d = '';
 let res =await axios.get('https://api.coingecko.com/api/v3/search/trending')
  let box = res.data.coins
  box.forEach((e)=>{
    let z = e.item.symbol
    let boxs= `
      ${e.item.score+1} => $${z}`
    
    return d += boxs
  //console.log(boxs);
    
  })
  ctx.reply(`${tanggalSaatIni}
  Coin Yang Sedang Trend 
  ${d}
  
  Dalam 24 Jam `)
  
});
  


bot.launch()
