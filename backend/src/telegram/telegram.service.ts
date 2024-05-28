import { UpdateResult } from 'typeorm';
import { Injectable, Logger } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"

@Injectable()
export class TelegramService {
    public async getMessages() {
        const response = await fetch('https://api.telegram.org/bot6927005938:AAEFvNe5sVp5qrnSUKuLF517A--H9h2qXho/getUpdates')
        const json = await response.json()
        const messages = json.result

        const result = []

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i].message.text
            const date = messages[i].message.date

            if (message.indexOf('@sldmlsdvBot') >= 0) {
                result.push({
                    message: message,
                    date: date
                })
            }
        }

        return result
    }
}