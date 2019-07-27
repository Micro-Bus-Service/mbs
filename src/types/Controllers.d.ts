import MessagesController from "../controllers/messagesController";
import ServiceController from "../controllers/ServiceController";

declare interface ControllerInterface {
    serviceController: ServiceController;
    messagesController: MessagesController;
}
