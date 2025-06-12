import { models, t } from "ox";
export class Task extends models.Model {
    static entity = "tasks";
    static meta = new models.Meta({
        app: "django_tasks_database",
        model: "dbtaskresult",
        url: "ox/tasks/task/",
        title: "task_path"
    });
    static fields() {
        return {
            id: this.attr(null),
            status: this.string(),
            enqueued_at: this.string(),
            started_at: this.string(),
            finished_at: this.string(),
            args_kwargs: this.attr(null),
            priority: this.number(),
            task_path: this.string(),
            queue_name: this.string(),
            backend_name: this.string(),
            run_after: this.string(),
            return_value: this.attr(null),
            exception_class_path: this.string(),
            traceback: this.string(),
        };
    }
}
