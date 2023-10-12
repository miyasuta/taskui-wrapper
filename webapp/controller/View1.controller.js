sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Component",
    "sap/ui/core/ComponentContainer"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Component, ComponentContainer) {
        "use strict";

        return Controller.extend("taskuinavigationroot.controller.View1", {
            onInit: function () {

            },

            onOpen: function () {
                const taskModel = new JSONModel({
                    InstanceID: this.byId("taskInstanceId").getValue()
                })

                const inboxAPI = {
                    updateTask: function () {                       
                    },
                    addAction: function (params, callback, controller) {
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
