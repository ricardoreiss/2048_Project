from agent import agent_blueprint
from flask import request, jsonify
from mech_python import Play2048

@agent_blueprint.route("/next-move", methods=["POST"])
def next_move():
    current_state = request.json
    print(current_state)
    response = jsonify(calculate_next_move(current_state))
    return response

def calculate_next_move(current_state):
    return Play2048.nextMove(current_state)
    