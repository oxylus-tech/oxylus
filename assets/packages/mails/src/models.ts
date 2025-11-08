import {models} from '@oxylus/ox'
import {Owned} from '@oxylus/auth/models'
import {File} from '@oxylus/files/models'


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
            name: this.string(""),
            mail_header: this.string(""),
            mail_signature: this.string(""),
            mail_subscription_footer: this.string(""),

            // ---- smtp
            smtp_host: this.string(""),
            smtp_port: this.number(587),
            smtp_username: this.string(""),
            smtp_password: this.string(""),
            smtp_encryption: this.number(465),

            // ---- imap
            /*imap_host: this.string(""),
            imap_port: this.number(993),
            imap_username: this.string(""),
            imap_password: this.string(""),
            imap_ssl: this.boolean(true),
            imap_folder: this.string("INBOX"),*/
        }
    }
}


/**
 * Counterpart of `ox_mails.models.BaseMail`.
 */
export class BaseMail extends Owned {
    static State = models.Enum("basemail.state", {
        DRAFT: 0,
        SENDING: 1,
        SENT: 2,
        ERROR: 3,
    })

    static fields() {
        return {
            ...super.fields(),
            account: this.string(""),
            state: this.number(0),
            updated: this.string(""),
            created: this.string(""),
            subject: this.string(""),
            content: this.string(''),
            attachments: this.attr([]),
            $account: this.belongsTo(MailAccount, "account"),
            $attachments: this.hasManyBy(File, "attachments"),
        }
    }
}


/**
 * Counterpart of `ox_mails.models.Mail`.
 */

export class Mail extends Owned {
    static entity = "mails"
    static meta = new models.Meta({
        app: "ox_mails",
        model: "mail",
        url: "ox/mails/mail/",
        title: "subject",
    })

    static fields() {
        return {
            ...super.fields(),
            recipients: this.string(""),
        }
    }
}
