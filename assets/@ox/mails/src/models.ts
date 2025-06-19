import {models} from 'ox'
import {Owned} from '@ox/auth/models'


export class MailAccount extends Owned {
    static entity = "mailAccounts"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "mailaccount",
        url: "ox/mails/account/",
        title: "name",
    })

    static Encryption = models.Enum('mailaccount.encryption', {
        NONE: 0,
        TLS: 1,
        SSL: 2,
    })

    static fields() {
        return {
            ...super.fields(),
            name: this.string(),
            smtp_host: this.string(),
            smtp_port: this.number(587),
            smtp_username: this.string(),
            smtp_password: this.string(),
            smtp_encryption: this.number(),
            imap_host: this.string(),
            imap_port: this.number(),
            imap_username: this.string(),
            imap_password: this.string(),
            imap_ssl: this.boolean(),
            imap_folder: this.string("INBOX"),
        }
    }
}


export class MailTemplate extends Owned {
    static entity = "mailTemplates"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "mailtemplate",
        url: "ox/mails/template/",
        title: "name",
    })

    static fields() {
        return {
            ...super.fields(),
            name: this.string(),
            account: this.string(),
            subject: this.string(),
            content: this.string(),
            created: this.string(),
            updated: this.string(),
            $account: this.belongsTo(MailAccount, "account")
        }
    }
}

export class OutMail extends Owned {
    static entity = "outMails"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "outmail",
        url: "ox/mails/outmail/",
        title: "subject",
    })

    static Status = models.Enum("outmail.", {
        DRAFT: 0,
        SENDING: 1,
        SENT: 2
    })

    static fields() {
        return {
            ...super.fields(),
            template: this.string(),
            contacts: this.attr(null),
            status: this.number(),
            content: this.string(),
            $template: this.belongsTo(MailTemplate, "template")
        }
    }
}
