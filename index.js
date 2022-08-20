const puppeteer = require('puppeteer');

async function getAcoes(page,acao) {
    await page.goto(`https://www.google.com/finance/quote/${acao}:BVMF`);
    const valor = await page.evaluate( async () => {
      return await document.querySelector('.kf1m0 .YMlKec').innerText;
    })
    const percentual = await page.evaluate(() => {
      return document.querySelector('.enJeMd').innerText;
    })
    return await {valor : valor, percentual : percentual.replace("\n"," | ")};
  }


const TelegramBot = require('node-telegram-bot-api');

const token = '5684475569:AAGHLbp_NTNQ1zQgRbrLhZUa9i-6pydLKO0';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});



bot.on('message',  async(msg) => {
  const chatId = await msg.chat.id;

    if(await msg.text.split('@').length > 1){
        msg.text = await msg.text.split('@')[0]
    }

    if(await msg.text === '/goodactions'){
        await bot.sendMessage(chatId, "Carregando...")
        const browser = await puppeteer.launch({
          headless:true,
          args:['--no-sandbox']
        });
        await console.log("Browser aberto")
        const page = await browser.newPage();
        await console.log("Página aberta")

        let acoes = {
            PETR3 : await getAcoes(page,'PETR3'),
            PETR4 : await getAcoes(page,'PETR4'),
            MGLU3 : await getAcoes(page,'MGLU3'),
            VALE3 : await getAcoes(page,'VALE3'),
            BBDC4 : await getAcoes(page,'BBDC4'),
            CPFE3 : await getAcoes(page,'CPFE3'),
            ITUB4 : await getAcoes(page,'ITUB4'),
            GOAU4 : await getAcoes(page,"GOAU4"), 
            MRFG3 : await getAcoes(page,"MRFG3"),
            BRKM5 : await getAcoes(page,"BRKM5"),
            ENBR3 : await getAcoes(page,"ENBR3"),
            CMIG4 : await getAcoes(page,"CMIG4"),
            BRAP4 : await getAcoes(page,"BRAP4")

        };
        await console.log("Ações carregadas")

        await page.close();
        await browser.close();

        resposta = await(
        `
PETR4: ${acoes.PETR4.valor} | (${acoes.PETR4.percentual})
PETR3: ${acoes.PETR4.valor} | (${acoes.PETR3.percentual})
MGLU3: ${acoes.MGLU3.valor} | (${acoes.MGLU3.percentual})
VALE3: ${acoes.VALE3.valor} | (${acoes.VALE3.percentual})
BBDC4: ${acoes.BBDC4.valor} | (${acoes.BBDC4.percentual})
CPFE3: ${acoes.CPFE3.valor} | (${acoes.CPFE3.percentual})
ITUB4: ${acoes.ITUB4.valor} | (${acoes.ITUB4.percentual})
GOAU4: ${acoes.GOAU4.valor} | (${acoes.GOAU4.percentual})
MRFG3: ${acoes.MRFG3.valor} | (${acoes.MRFG3.percentual})
BRKM5: ${acoes.BRKM5.valor} | (${acoes.BRKM5.percentual})
ENBR3: ${acoes.ENBR3.valor} | (${acoes.ENBR3.percentual})
CMIG4: ${acoes.CMIG4.valor} | (${acoes.CMIG4.percentual})
BRAP4: ${acoes.BRAP4.valor} | (${acoes.BRAP4.percentual})

        `)
        await console.log("Resposta gerada")
        await bot.sendMessage(chatId,resposta)
        await console.log("Mensagem enviada")
    }
});

