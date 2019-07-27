import ServiceController from "../controllers/ServiceController";
import MessagesController from "../controllers/messagesController";

declare interface Controllernterface {
    serviceController: ServiceController,
    messagesController: MessagesController,
}