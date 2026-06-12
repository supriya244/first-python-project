class Agent:
    def __init__(self, name):
        self.name = name

    def work(self):
        print(self.name + " is working")

agent1 = Agent("Sports Agent")
agent1.work()