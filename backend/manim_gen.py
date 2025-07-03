from manim import *

class FlowScene(Scene):
    def construct(self):
        # Define colors
        frontend_color = BLUE
        backend_color = GREEN
        database_color = RED
        text_color = WHITE

        # Create objects
        frontend = Rectangle(width=2, height=1, color=frontend_color, fill_opacity=1)
        frontend_text = Text("Frontend", color=text_color).scale(0.6)
        frontend_group = VGroup(frontend, frontend_text).move_to(LEFT * 4 + UP * 1.5)
        self.add(frontend_group)

        backend = Rectangle(width=2, height=1, color=backend_color, fill_opacity=1)
        backend_text = Text("Backend", color=text_color).scale(0.6)
        backend_group = VGroup(backend, backend_text).move_to(DOWN * 0.5)
        self.add(backend_group)

        database = Rectangle(width=2, height=1, color=database_color, fill_opacity=1)
        database_text = Text("Database", color=text_color).scale(0.6)
        database_group = VGroup(database, database_text).move_to(RIGHT * 4 + DOWN * 2.5)
        self.add(database_group)

        user_text = Text("User logs in", color=text_color).scale(0.5).move_to(UP * 3)
        self.play(Write(user_text))
        self.wait(0.5)

        # Frontend -> Backend
        arrow1 = Arrow(frontend_group.get_bottom(), backend_group.get_top(), buff=0.2)
        request_text = Text("Login Request", color=text_color).scale(0.4).move_to(arrow1.get_center() + RIGHT * 0.5 + UP * 0.2)

        self.play(Create(arrow1), Write(request_text))
        self.wait(0.5)

        # Backend -> Database
        arrow2 = Arrow(backend_group.get_bottom(), database_group.get_top(), buff=0.2)
        database_request_text = Text("Check Credentials", color=text_color).scale(0.4).move_to(arrow2.get_center() + RIGHT * 0.5 + UP * 0.2)

        self.play(Create(arrow2), Write(database_request_text))
        self.wait(0.5)

        # Database -> Backend
        arrow3 = Arrow(database_group.get_top(), backend_group.get_bottom(), buff=0.2)
        database_response_text = Text("Access Granted", color=text_color).scale(0.4).move_to(arrow3.get_center() + LEFT * 0.5 + DOWN * 0.2)

        self.play(Create(arrow3), Write(database_response_text))
        self.wait(0.5)

        # Backend -> Frontend
        arrow4 = Arrow(backend_group.get_top(), frontend_group.get_bottom(), buff=0.2)
        response_text = Text("Login Success", color=text_color).scale(0.4).move_to(arrow4.get_center() + LEFT * 0.5 + DOWN * 0.2)

        self.play(Create(arrow4), Write(response_text))
        self.wait(0.5)

        self.play(FadeOut(user_text, arrow1, request_text, arrow2, database_request_text, arrow3, database_response_text, arrow4, response_text))

        access_granted_text = Text("Access Granted to User", color=text_color).scale(0.7).move_to(UP * 3)
        self.play(Write(access_granted_text))
        self.wait(2)