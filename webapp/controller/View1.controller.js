sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Button",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Button, MessageToast) {
        "use strict";

        return Controller.extend("taskuiwrapper.controller.View1", {
            onInit: function () {

            },

            onShowTaskUI: function () {
                const taskModel = new JSONModel({
                    InstanceID: this.byId("taskInstanceId").getValue()
                })

                const that = this;
                const inboxAPI = {
                    updateTask: function () {                       
                    },
                    addAction: function (params, callback, controller) {
                        // make the first letter of type uppercase
                        const type = params.type.charAt(0).toUpperCase() + params.type.slice(1);
                        const button = new Button({
                            text: params.label,
                            type: type,
                            press: function () {
                                MessageToast.show(`Action ${params.label} triggered`)
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
