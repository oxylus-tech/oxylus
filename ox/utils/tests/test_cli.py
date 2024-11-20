from rest_framework import serializers

from ox.utils import cli


class NestedSerializer(serializers.Serializer):
    name = serializers.CharField(help_text="Please enter your name")
    values = serializers.ListField(child=serializers.IntegerField())


class ParentSerializer(serializers.Serializer):
    nested = NestedSerializer(many=True, required=True)


class Prompt(cli.Prompt):
    def __init__(self, *args, inputs=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.inputs = inputs
        self.questions = []

    def input(self, question, help):
        cli.fmt.print(question)
        help and cli.fmt.print(help, cls="info")
        self.questions.append(question)
        return self.inputs and self.inputs.pop(0) or ""


class TestFormat:
    def test_format(self):
        source = "hello[warning]test[/][unknown]"
        expected = "\033[0mhello\033[33mtest\033[0m[unknown]\033[0m"
        assert cli.fmt(source) == expected


class TestPromptDRF:
    inputs = ["name", "1", "2", "3", "", "yes", "name_2", "4", "5", "6", "", "no", ""]

    def test_drf(self):
        prompt = Prompt(inputs=self.inputs)
        result = prompt.drf(ParentSerializer())
        assert result == {
            "nested": [
                {"name": "name", "values": [1, 2, 3]},
                {"name": "name_2", "values": [4, 5, 6]},
            ]
        }
