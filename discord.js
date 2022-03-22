const { Client } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./token.json');
const { prefix } = require('./config.json');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const fs = require('fs');
const { url } = require('inspector');
const client = new Client();
var gMoney = 0;
var rand = 0;
var money = 0;
var day = 0;
var state = false;
var passJP = 100000;
var passMin = 0;
var passMax = 1000;
var passNum = 0;
// 建立一個類別來管理 Property 及 Method
function getRandom(x) {
    return Math.floor(Math.random() * x);
};
function Mora(money, msg, totalmoney) {
    var img = [
        'https://i.imgur.com/wScbzv2.jpg',
        'https://i.imgur.com/sc1AEsW.jpg',
        'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/10/00/a1000067/img/basic/a1000067_main.jpg']
    var list = ["石頭", "剪刀", "布"]
    var imgch;
    var ans;
    totalmoney = Number(totalmoney) - Number(money)
    //0=石頭,1=剪刀,2=布
    cuprand = getRandom(150) % 3;
    userrand = getRandom(150) % 3;
    if (cuprand == 0) {
        if (userrand == 0) { money = money; ans = "Tie!"; imgch = img[0] }
        else if (userrand == 1) { money = 0; ans = "You Lose~"; imgch = img[1] }
        else { money = money * 2; ans = "You Win!!!"; imgch = img[2] }
    } else if (cuprand == 1) {
        if (userrand == 1) { money = money; ans = "Tie!"; imgch = img[0] }
        else if (userrand == 2) { money = 0; ans = "You Lose~"; imgch = img[1] }
        else { money = money * 2; ans = "You Win!!!"; imgch = img[2] }
    } else {
        if (userrand == 2) { money = money; ans = "Tie!"; imgch = img[0] }
        else if (userrand == 0) { money = 0; ans = "You Lose~"; imgch = img[1] }
        else { money = money * 2; ans = "You Win!!!"; imgch = img[2] }
    }
    totalmoney = Number(totalmoney) + Number(money)
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('角卷猜拳')
        .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
        .setDescription('角卷あい、こで、しょ')
        .setThumbnail('https://pht.qoo-static.com/NuyOBNU1CGmbWlUxjDZOfUMZ43qjtUro8w2FhFU6YRwAoT7rh-VdsYhuPCV_lbI-7j8=w512')
        .addField('你出的拳', list[userrand])
        .addField('\u200B', '\u200B')
        .addField('WTM出的拳', list[cuprand])
        .setImage(imgch)
        .setTimestamp()
        .setFooter(ans + '目前金額:' + totalmoney, 'https://pht.qoo-static.com/NuyOBNU1CGmbWlUxjDZOfUMZ43qjtUro8w2FhFU6YRwAoT7rh-VdsYhuPCV_lbI-7j8=w512');
    msg.reply(embed);
    return totalmoney;
}
function Size(money, msg, totalmoney) {
    var list = ["♤", "♡", "♢", "♧"]
    var card = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    var img = [
        'https://pbs.twimg.com/media/Edx1wRFU4AIipZ6.jpg',
        'https://pbs.twimg.com/media/EkNJYhVVkAA03dh.jpg',
        'https://pbs.twimg.com/media/EtDjI38VgAIGs3r.jpg']
    var ans;
    cuprand = getRandom(53);
    userrand = getRandom(53);
    while (userrand == cuprand) { userrand = getRandom(53); }
    if (userrand % 13 == cuprand % 13) {
        ans = 0
    } else {
        ans = ((userrand % 13) - (cuprand % 13))
        if (ans > 0) ans = ans + 1
        else ans = ans - 1
    }
    var imgch;
    if (ans > 0) imgch = img[0];
    else if (ans < 0) imgch = img[1];
    else imgch = img[2];
    totalmoney = Number(totalmoney) + (Number(money) * ans)
    const embed = new Discord.MessageEmbed()
        .setColor('#EA0000')
        .setTitle('寶鐘比大小')
        .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
        .setDescription('Hornyサイズより')
        .setThumbnail('https://obs.line-scdn.net/0hCnLfAmqrHEFxHzWZ4TpjFktJHy5Ccw9CFSlNXi5xQnULfAwfGH9QdF1PRXdbe1sfHytXJVQdB3AOeAhFSH5Q/w644')
        .addField('結果', '' + ans + '倍')
        .addField('你的牌', list[userrand % 4] + card[userrand % 13])
        .addField('\u200B', '\u200B')
        .addField('AHOY出的拳', list[cuprand % 4] + card[cuprand % 13])
        .setImage(imgch)
        .setTimestamp()
        .setFooter(ans * money + '目前金額:' + totalmoney, 'https://obs.line-scdn.net/0hCnLfAmqrHEFxHzWZ4TpjFktJHy5Ccw9CFSlNXi5xQnULfAwfGH9QdF1PRXdbe1sfHytXJVQdB3AOeAhFSH5Q/w644');
    msg.reply(embed);
    return totalmoney;
}
function Spin(money, msg, totalmoney) {
    var list = [10, 5, 2, 0.5, 0.25, 0.1, 1, 0]
    var img = [
        'https://pbs.twimg.com/media/Ekd8yBJVgAAXkGe.jpg',
        'https://i.ytimg.com/vi/qyWKHedUKWY/maxresdefault.jpg',
        'https://www.webacg.com/wp-content/uploads/2021/02/d5ade274fdc3df29ee3d8923ecd9f897acc775d8-480x300.jpg',
        'https://steamuserimages-a.akamaihd.net/ugc/1017191662606902191/571DD33DFC2AC71DB9AFB28A715B7AC3C9E81DDC/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true']
    var Srand = 0;
    while (Srand == 0) { Srand = getRandom(402); }
    var ans;
    if (Srand <= 25) ans = list[0];
    else if (Srand <= 75) ans = list[1];
    else if (Srand <= 175) ans = list[2];
    else if (Srand <= 300) ans = list[3];
    else if (Srand <= 350) ans = list[4];
    else if (Srand <= 375) ans = list[5];
    else if (Srand <= 400) ans = list[6];
    else ans = list[7];
    var imgch;
    if (ans > 1) imgch = img[0];
    else if (ans == 0) imgch = img[2];
    else if (ans < 1) imgch = img[1];
    else imgch = img[3];
    const embed = new Discord.MessageEmbed()
        .setColor('FF359A')
        .setTitle('菁英轉盤')
        .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
        .setDescription('さくらみこ エリート')
        .setThumbnail('https://i1.sndcdn.com/avatars-8cQbXnnNhnpm8c7G-bsEzig-t500x500.jpg')
        .addField('中獎結果', '' + ans + '倍')
        .setImage(imgch)
        .setTimestamp()
        .setFooter('目前金額:' + Math.floor(totalmoney * ans), 'https://i1.sndcdn.com/avatars-8cQbXnnNhnpm8c7G-bsEzig-t500x500.jpg');
    msg.reply(embed)
    //console.log(msg.member.user.tag)
    return Math.floor(totalmoney * ans);
}
function Pass(money, msg, totalmoney, num) {
    var img = [
        'https://i.imgur.com/RKlw8Xy.jpg',
        'https://i1.hdslb.com/bfs/archive/fd46ce88b2dd38f86271f9497b5a0b05069bd00c.jpg@560w_350h_100Q_1c.webp']
    var ans = 0;
    if (num == passNum) {
        ans = 1;
        passNum = 0
        passMax = 1000; passMin = 0;
    } else if (num < passNum) passMin = num;
    else passMax = num;
    const embed = new Discord.MessageEmbed()
    if (ans == 1) {
        money = passJP
        passJP = 100000
        embed
            .setColor('#00EC00')
            .setTitle('終極密碼初號機')
            .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
            .setDescription('るしあ おっぱいなし')
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFlmJvLM5naXlyF7IyEiSDB_FprTP4pfBrw&usqp=CAU')
            .addField('恭喜中獎', '獎金:' + money)
            .setImage(img[0])
            .setTimestamp()
            .setFooter('目前金額:' + Math.floor(totalmoney + money), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFlmJvLM5naXlyF7IyEiSDB_FprTP4pfBrw&usqp=CAU');
        passJP = 100000;
    } else {
        money = -10000
        passJP = passJP + 10000;
        embed
            .setColor('#00EC00')
            .setTitle('終極密碼初號機')
            .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
            .setDescription('るしあ おっぱいなし')
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFlmJvLM5naXlyF7IyEiSDB_FprTP4pfBrw&usqp=CAU')
            .addField('沒中', '範圍' + passMin + '~' + passMax)
            .addField('獎池累積', passJP)
            .setImage(img[1])
            .setTimestamp()
            .setFooter('目前金額:' + Math.floor(totalmoney + money), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFlmJvLM5naXlyF7IyEiSDB_FprTP4pfBrw&usqp=CAU');
    }
    msg.reply(embed)
    if (ans == 1) {
        channaltSet = client.channels.cache.get("835166453363769374");
        channaltSet.send("本局結束\n請輸入!!startPass新的回合!");
        channaltest = client.channels.cache.get("819900289724186684");
    }
    //console.log(msg.member.user.tag)
    return Math.floor(totalmoney + money);;
}
function getMoney(id) {
    gMoney = 0;
    var hasUser = false;
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換成JSON對象
        user = JSON.parse(user);
        //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        for (var i = 0; i < user.userInfo.length; i++) {
            if (id == user.userInfo[i].id) {
                hasUser = true;
                gMoney = user.userInfo[i].money
            }
        }
        if (!hasUser) {
            msg.reply("請先簽到過一次喔~")
        }
    })
}
function cheakMoney(id, money, fun, msg, num = 0) {
    var hasUser = false;
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換成JSON對象
        user = JSON.parse(user);
        //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        for (var i = 0; i < user.userInfo.length; i++) {
            if (id == user.userInfo[i].id) {
                hasUser = true;
                theUser = i;
                if (user.userInfo[i].money < Number(money) && money != "allin")
                    msg.reply("目前金額:" + user.userInfo[i].money + "錢不夠還敢玩啊!")
                else {
                    if (money == "allin") {
                        console.log(money)
                        money = user.userInfo[i].money;
                        console.log(money)
                    } if (money < 1000)
                        msg.reply("目前金額:" + user.userInfo[i].money + "沒錢還敢玩啊!")
                    else {
                        var Backmoney = fun(Number(money), msg, user.userInfo[i].money, num);
                        user.userInfo[i].money = Backmoney;
                    }
                }
            }
        }
        if (!hasUser) {
            msg.reply("請先簽到過一次喔~")
        } else {
            console.log(user.userInfo);
            //將 total 設值為用戶數
            //user.total = user.userInfo.length;
            //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
            var str = JSON.stringify(user);

            //最後再將數據寫入
            fs.writeFile('./userInfo.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        }
    })
}
function writeJSON(newUser) {
    //先將原本的 json 檔讀出來
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換為 JSON 對象
        user = JSON.parse(user);
        //將傳來的資訊推送到數組對象中
        user.userInfo.push(newUser);
        //user.total = user.userInfo.length;
        console.log(user.userInfo);

        //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        var str = JSON.stringify(user);
        //將字串符傳入您的 json 文件中
        fs.writeFile('./userInfo.json', str, function (err) {
            if (err) {
                console.error(err);
            }
        })
    })
}
function giveMoney(msg, giveid, id, money) {
    var give; var giveUser = false; var giveHas = true;
    var get; var getUser = false;
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換成JSON對象
        user = JSON.parse(user);
        //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        for (var i = 0; i < user.userInfo.length; i++) {
            if (giveid == user.userInfo[i].id) {
                giveUser = true;
                give = i;
                if (user.userInfo[i].money < money) giveHas = false
            }
        }
        for (var i = 0; i < user.userInfo.length; i++) {
            if (id == user.userInfo[i].id) {
                getUser = true;
                get = i;
            }
        }
        if (giveUser) {
            if (getUser) {
                if (giveHas) {
                    user.userInfo[get].money = user.userInfo[get].money + money
                    user.userInfo[give].money = user.userInfo[give].money - money
                    client.users.fetch(id).then(user => msg.channel.send(msg.author.username + '給予' + user.username + " " + money + "元"));
                    //將 total 設值為用戶數
                    //user.total = user.userInfo.length;
                    //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
                    var str = JSON.stringify(user);
                    //最後再將數據寫入
                    fs.writeFile('./userInfo.json', str, function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
                } else
                    msg.reply('前不夠還想給啊，目前金額:' + user.userInfo[give].money)
            } else
                msg.reply('需要被施捨的還沒簽到過唷!至少要先遷到過一次><')
        } else
            msg.reply('想給錢要先至少簽到過一次唷><')
    })
}
function modifyJSON(id, newUser) {
    //先將原本的 json 檔讀出來
    var hasUser = false;
    var theUser = 0;
    state = false;
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換成JSON對象
        user = JSON.parse(user);
        //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        for (var i = 0; i < user.userInfo.length; i++) {
            if (id == user.userInfo[i].id) {
                hasUser = true;
                theUser = i;
                if (!user.userInfo[i].state) {
                    state = true;
                    user.userInfo[i].money = user.userInfo[i].money + 1000;
                    user.userInfo[i].day = user.userInfo[i].day + 1;
                    user.userInfo[i].state = true;
                }
            }
        }
        console.log(user.userInfo);
        //將 total 設值為用戶數
        //user.total = user.userInfo.length;
        //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        var str = JSON.stringify(user);

        //最後再將數據寫入
        fs.writeFile('./userInfo.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            if (hasUser) {
                if (state) {
                    money = user.userInfo[theUser].money;
                    day = user.userInfo[theUser].day;
                }
            } else {
                state = true
                writeJSON(newUser)
                money = 1000
                day = 1
            }
        })
    })
}
function modifyJSON_divine(id,msg) {
    //先將原本的 json 檔讀出來
    var hasUser = false;
    var theUser = 0;
    state = false;
    fs.readFile('./userInfo.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        //將二進制數據轉換為字串符
        var user = userInfo.toString();
        //將字符串轉換成JSON對象
        user = JSON.parse(user);
        //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        for (var i = 0; i < user.userInfo.length; i++) {
            if (id == user.userInfo[i].id) {
                hasUser = true;
                theUser = i;
                if (!user.userInfo[i].divination) {
                    rand = getRandom(100); //會回傳0~2之間的隨機數字
                    const { divination } = require('./divine.json');
                    imgch = "http://www.chance.org.tw/%E7%B1%A4%E8%A9%A9%E9%9B%86/%E6%B7%BA%E8%8D%89%E9%87%91%E9%BE%8D%E5%B1%B1%E8%A7%80%E9%9F%B3%E5%AF%BA%E4%B8%80%E7%99%BE%E7%B1%A4/%E6%B7%BA%E8%8D%89%E9%87%91%E9%BE%8D%E5%B1%B1%E8%A7%80%E9%9F%B3%E5%AF%BA%E4%B8%80%E7%99%BE%E7%B1%A4%E6%8E%83%E6%8F%8F%E5%9C%96%E7%89%87/%E6%B7%BA%E8%8D%89%E9%87%91%E9%BE%8D%E5%B1%B1%E8%A7%80%E9%9F%B3%E5%AF%BA%E4%B8%80%E7%99%BE%E7%B1%A4"+((rand+1)==100?'100':(rand<9?'00'+(rand+1):'0'+(rand+1)))+"a.jpg";
                    ansurl =  "http://www.chance.org.tw/%E7%B1%A4%E8%A9%A9%E9%9B%86/%E6%B7%BA%E8%8D%89%E9%87%91%E9%BE%8D%E5%B1%B1%E8%A7%80%E9%9F%B3%E5%AF%BA%E4%B8%80%E7%99%BE%E7%B1%A4/%E7%B1%A4%E8%A9%A9%E7%B6%B2%E2%80%A7%E6%B7%BA%E8%8D%89%E9%87%91%E9%BE%8D%E5%B1%B1%E8%A7%80%E9%9F%B3%E5%AF%BA%E4%B8%80%E7%99%BE%E7%B1%A4__%E7%AC%AC"+((rand+1)==100?'100':(rand<9?'00'+(rand+1):'0'+(rand+1)))+"%E7%B1%A4.htm"
                    ans = divination[rand]
                    const embed = new Discord.MessageEmbed()
                    .setColor('FF359A')
                    .setTitle('大神占卜')
                    .setAuthor(msg.member.user.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
                    .setDescription('ミオ占い')
                    .setThumbnail('https://imgs.aixifan.com/content/2021_6_6/1.6229792625733843E9.jpeg')
                    .addField(ans,"[詳細詩籤]("+ansurl+")")
                    .setImage(imgch)
                    .setTimestamp()
                    .setFooter('大神ミオだよ～', 'https://imgs.aixifan.com/content/2021_6_6/1.6229792625733843E9.jpeg');
                    setTimeout(function () {msg.reply(embed);}, 100);
                    state = true;
                    user.userInfo[i].divination = true;
                }
            }
        }
        console.log(user.userInfo);
        //將 total 設值為用戶數
        //user.total = user.userInfo.length;
        //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        var str = JSON.stringify(user);
        if (hasUser) {
            //最後再將數據寫入
            fs.writeFile('./userInfo.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        } else {
            msg.reply('想給錢要先至少簽到過一次唷><')
        }
    })
}
class Bot {

    constructor() {
        this.isPlaying = false;
        this.queue = {};
        this.connection = {};
        this.dispatcher = {};
    }
    startPass(msg) {
        if (passNum == 0) {
            passNum = getRandom(1000)
            msg.channel.send("終極密碼開始!")
        } else {
            msg.reply("上一把還沒結束喔!\n目前範圍:" + passMin + '~' + passMax);
        }
    }
    getrange(msg) {
        msg.reply("目前範圍:" + passMin + '~' + passMax);
    }
    getmoney(msg) {
        getMoney(msg.author.id)
        setTimeout(function () { msg.reply("目前金額:" + gMoney); }, 50);
    }
    spin(msg) {
        cheakMoney(msg.author.id, 1000, Spin, msg);
    }
    pass(msg) {
        if (passNum == 0) {
            msg.reply("目前沒有未結束的遊戲，請輸入!!startPass開始");
        } else {
            const num = msg.content.replace(`${prefix}pass`, '').trim();
            if ((isNaN(num)) || num == ' ' || num == '') {
                msg.reply("打數字啊腦殘ˋˊ");
            }
            else if (Number(num) >= passMax || Number(num) <= passMin)
                msg.reply("目前範圍" + passMin + '~' + passMax + "喔");
            else
                cheakMoney(msg.author.id, 10000, Pass, msg, num);
        }
    }
    mora(msg) {
        const money = msg.content.replace(`${prefix}mora`, '').trim();
        if (money < 1000) msg.reply("最低下注金額1000唷><");
        else if ((isNaN(money) && money != "allin") || money == ' ' || money == '') {
            msg.reply("打數字啊腦殘ˋˊ");
        }
        else
            cheakMoney(msg.author.id, money, Mora, msg);
    }
    size(msg) {
        const money = msg.content.replace(`${prefix}size`, '').trim();
        if (money < 1000) msg.reply("最低下注金額1000唷><");
        else if ((isNaN(money) && money != "allin") || money == ' ' || money == '') {
            msg.reply("打數字啊腦殘ˋˊ");
        }
        else
            cheakMoney(msg.author.id, money, Size, msg);
    }
    sign(msg) {
        var newUser = {
            "id": msg.author.id,
            "money": 10000,
            "day": 1,
            "state": true,
            "divination": false
        }
        modifyJSON(msg.author.id, newUser)
        setTimeout(function () { if (!state) msg.reply("今天已經簽到過囉!"); else msg.reply('簽到成功!\n簽到天數:' + day + '目前金額' + money); }, 50);
    }
    divine(msg) {
        modifyJSON_divine(msg.author.id,msg)
        setTimeout(function () { if (!state) msg.reply("今天已經占卜過囉!");}, 50);
    }
    meID(msg) {
        msg.reply(msg.author.id);
    }
    give(msg) {
        const args = msg.content.replace(`${prefix}give`, '').trim();
        var arr = args.split(",");
        //console.log(arr.length)
        if (arr[0] != '') {
            if (Math.floor(arr[1]) <= 0) msg.reply('還敢吸血啊米蟲')
            else if (isNaN(arr[1])) msg.reply('打數字啊腦殘ˋˊ')
            else giveMoney(msg, msg.author.id, arr[0], Math.floor(Number(arr[1])))
        }
    }
}

const bot = new Bot();
// 當 Bot 接收到訊息時的事件
client.on('message', async (msg) => {

    // 如果發送訊息的地方不是語音群（可能是私人），就 return
    if (!msg.guild) return;
    if (msg.content === `${prefix}meID`) {
        if (msg.channel.id == "819900289724186684")
            bot.meID(msg);
    }
    // !!join
    if (msg.content === `${prefix}sign`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "819900289724186684")
            bot.sign(msg);
    }
    if (msg.content === `${prefix}divine`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "891937796535750677")
            bot.divine(msg);
    }
    if (msg.content.indexOf(`${prefix}pass`) > -1) {
        if (msg.channel.id == "835166453363769374")
            bot.pass(msg);
    }
    if (msg.content === `${prefix}spin`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "819900457237348352")
            bot.spin(msg);
    }
    if (msg.content === `${prefix}startPass`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "835166453363769374")
            bot.startPass(msg);
    }
    if (msg.content === `${prefix}money`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "819900289724186684")
            bot.getmoney(msg);
    }
    if (msg.content === `${prefix}range`) {
        // 機器人加入語音頻道
        if (msg.channel.id == "835166453363769374")
            bot.getrange(msg);
    }
    if (msg.content.indexOf(`${prefix}mora`) > -1) {
        if (msg.channel.id == "833983383011983380")
            bot.mora(msg);
    }
    if (msg.content.indexOf(`${prefix}size`) > -1) {
        if (msg.channel.id == "819900571678146620")
            bot.size(msg);
    }
    if (msg.content.indexOf(`${prefix}give`) > -1) {
        if (msg.channel.id == "819900289724186684")
            bot.give(msg);
    }
});

// 連上線時的事件
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.channels.cache.get("819900289724186684"));
    channaltest = client.channels.cache.get("819900289724186684");
    // channaltest.send("簽到已重製!");
    // fs.readFile('./userInfo.json', function (err, userInfo) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     //將二進制數據轉換為字串符
    //     var user = userInfo.toString();
    //     //將字符串轉換成JSON對象
    //     user = JSON.parse(user);
    //     //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
    //     for (var i = 0; i < user.userInfo.length; i++) {
    //         user.userInfo[i].state = false;
    //         if (user.userInfo[i].money < 0)
    //             user.userInfo[i].money = 0
    //     }
    //     //將 total 設值為用戶數
    //     //user.total = user.userInfo.length;
    //     //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
    //     var str = JSON.stringify(user);
    //     //最後再將數據寫入
    //     fs.writeFile('./userInfo.json', str, function (err) {
    //         if (err) {
    //             console.error(err);
    //         }
    //     })
    // })
    schedule.scheduleJob("0 0 0 * * *", function () {
        channaltest = client.channels.cache.get("819900289724186684");
        channaltest.send("目前時間:" + new Date() + "\n" + "簽到重製!");
        fs.readFile('./userInfo.json', function (err, userInfo) {
            if (err) {
                return console.error(err);
            }
            //將二進制數據轉換為字串符
            var user = userInfo.toString();
            //將字符串轉換成JSON對象
            user = JSON.parse(user);
            //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
            for (var i = 0; i < user.userInfo.length; i++) {
                user.userInfo[i].state = false;
                user.userInfo[i].divination = false;
                if (user.userInfo[i].money < 0)
                    user.userInfo[i].money = 0
            }
            //將 total 設值為用戶數
            //user.total = user.userInfo.length;
            //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
            var str = JSON.stringify(user);
            //最後再將數據寫入
            fs.writeFile('./userInfo.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        })
    });
});


client.login(token);