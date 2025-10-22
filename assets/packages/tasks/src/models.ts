import { t } from "@oxylus/ox"
import { Model, Meta, type IModel } from "@oxylus/ox/models"


export class Task extends Model {
    static entity = "tasks"
    static meta = new Meta({
        app: "django_tasks_database",
        model: "dbtaskresult",
        url: "ox/tasks/task/",
        title: "task_path"
    })

    static fields() {
        return {
            id: this.attr(null),
            status: this.string(""),
            enqueued_at: this.string(""),
            started_at: this.string(""),
            finished_at: this.string(""),
            args_kwargs: this.attr(null),
            priority: this.number(0),
            task_path: this.string(""),
            queue_name: this.string(""),
            backend_name: this.string(""),
            run_after: this.string(""),
            return_value: this.attr(null),
            exception_class_path: this.string(""),
            traceback: this.string(""),
        }
    }
}
