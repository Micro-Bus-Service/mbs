import MessagesController from "../controllers/messagesController";
import ServiceController from "../controllers/serviceController";

export interface ControllerInterface {
  serviceController: ServiceController;
  messagesController: MessagesController;
}
