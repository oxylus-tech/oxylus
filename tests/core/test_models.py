class TestModel:
    def get_absolute_url(self, model):
        raise NotImplementedError("get_absolute_url")

    def get_api_url(self, model):
        raise NotImplementedError("get_api_url")

    def get_list_url(self, model):
        raise NotImplementedError("get_list_url")

    def reverse_url(self, model):
        raise NotImplementedError("reverse_url")
