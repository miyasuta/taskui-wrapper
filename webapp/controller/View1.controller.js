sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Button",
    "sap/m/MessageToast",
    "sap/m/ToolbarSpacer"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Button, MessageToast, ToolbarSpacer) {
        "use strict";

        return Controller.extend("taskuiwrapper.controller.View1", {
            onInit: function () {

            },

            onShowTaskUI: function () {
                const taskModel = new JSONModel({
                    InstanceID: this.byId("taskInstanceId").getValue()
                })

                //clear buttons
                this.byId("toolbar").removeAllContent();
                this.byId("toolbar").addContent(new ToolbarSpacer());

                const that = this;
                const inboxAPI = {
                    updateTask: function () {                       
                    },
                    addAction: function (action, actionEventHandler, listener) {
                        // make the first letter of type uppercase
                        const type = action.type.charAt(0).toUpperCase() + action.type.slice(1);
                        const button = new Button({
                            text: action.label,
                            type: type,
                            press: function () {
                                MessageToast.show(`Action ${action.label} triggered`)
                            }
                        })
                        that.byId("toolbar").addContent(button);
                    }
                };

                this.byId("page").setBusy(true);
                this.getOwnerComponent().createComponent({
                    usage: 'taskUI',
                    componentData: {
                        startupParameters: {
                            taskModel: taskModel, 
                            inboxAPI: inboxAPI
                        }
                    }
                }).then((component)=> {
                    this.byId("attachmentComponentContainer").setComponent(component);
                    this.byId("page").setBusy(false);
                });
                            
            }
        });
    });
