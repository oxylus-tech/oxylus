class TestRenderer:
    user_content = """<p><span data-if-variable="name">Your email: <span data-variable="email"></span></span></p>"""

    def test_engine(self, renderer):
        engine = renderer.engine
        assert engine.dirs == [str(d) for d in renderer.template_dirs]
        assert engine.template_libraries == engine.get_template_libraries(renderer.template_libraries)

    def test_compile(self, renderer):
        template = renderer.compile(self.user_content)
        assert template.source == ("""<p>{% if name %}Your email: {{ email }}{% endif %}</p>""")

    def test_get_template_dirs(self, renderer):
        assert renderer.get_template_dirs() == [str(d) for d in renderer.template_dirs]


#
#    def test_render_without_template(self, renderer):
#        assert renderer.render(name="Foo") == "<h1>Test: Foo</h1>\n"
#
#    def test_render_with_template(self, renderer):
#        template = renderer.compile(self.user_content)
#        assert renderer.render(template, name="Foo", email="foo@bar.tee") == (
#            """<p>Your email: foo@bar.tee</p>"""
#        )
#
#    # TBD
#    def test_get_template(self, renderer):
#        pass
#
#    def test_get_template_name(self, renderer):
#        pass
#
#    def test_get_context_data(self, renderer):
#        pass
#
