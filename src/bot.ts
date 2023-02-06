import { Telegraf } from "telegraf";
import * as dotenv from 'dotenv';
import axios from 'axios';
import { generateImage, magic} from './generate';

dotenv.config();


const bot = new Telegraf(process.env.BOT_TOKEN ?? '');

bot.start((ctx) => ctx.reply('ciao genera cose con questo bot'));
bot.help((ctx) => ctx.reply(' boh fai comandi a caso e vediamo cosa succede '));

bot.command('ciao', (ctx) => ctx.reply('ciao'));
bot.command('img', (ctx) => image(ctx) );
bot.command('txt', (ctx) => text(ctx) );

async function image(ctx: any) {

    const urls = await generateImage(ctx.message.text);
    console.log(ctx.message.text);
    
    for (let i = 0; i < urls.length; i++) {
        await ctx.replyWithPhoto({ url: urls[i], text: 'ciao' });
    }
}

async function text(ctx: any) {
    
        const text = await magic(ctx.message.text);

        await ctx.reply(text);
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
console.log('Bot started');