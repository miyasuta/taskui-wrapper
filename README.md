## Purpose
The purpose of this project is to test SAP Build Process Automation task UIs in Business Application Studio (BAS).

![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/517901ab-1c5d-48e0-88e8-4dd7d35e6ee4)

## How to use
### 1. Clone the repository

- Clone this repository into BAS.
```
git clone https://github.com/miyasuta/taskui-wrapper.git
```

### 2. Enable App-to-App navigation

- Enable App-to-App navigation with the following command.
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/0bacd754-f07e-417b-9bcc-cd718fff679c)

- Select taskui-wrapper as the source.  
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/91cf11cb-813c-4ced-b769-da90f1bf6d00)

- Select your task ui project.  
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/b7f09b59-e216-41fc-80ac-25763e1da325)

### 3. Configure ui5.yaml

- In **u5.yaml**, replace the dot(.) in the path with a slash (/).
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/0dbfc725-651a-4445-80f0-d5df8fea33ea)

- In **ui5.yaml** add the following block under customMiddleware fiori-tools-proxy.
  ```
          backend:
          - path: /resources/ordersmgtnsp/workflowuimodule/bpmworkflowruntime  
            pathPrefix: /public/workflow/rest
            url: https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com
            destination: workflowruntime
  ```
  The destination `workflowruntime` has to be created in the BTP subaccount. Please refere to the following blog post for the procedure.
  https://blogs.sap.com/2023/08/28/testing-workflow-start-ui-in-sap-business-application-studio/

  Also, `/ordersmgtnsp/workflowuimodule` has to be replaced with the `<namespace>/<id>` of your application.

### 4. Configure component usage in manifest.json

- In **manifest.json**, locate the following section under `sap.ui5`.
```
      "components": {
        "ordersmgtnsp.workflowuimodule": {
          "lazy": true
        }
      }
    },
    "componentUsages": {
      "taskUI": {
        "name": "ordersmgtnsp.workflowuimodule",
        "settings": {}
      }
```

- Replace `ordersmgtnsp.workflowuimodule` with the `<namespace>.<id>` of your application.

### 5. Run the wrapper app

- Run `npm start` to run the wrapper app

- Enter a task instance ID (UUID) into the input field and press the "**SHow Task UI**" button.
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/a74c3848-416a-4b2d-8e01-e293d1cfefa7)

- The task UI will be displayed with task data.
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/1ef846fb-23bb-4291-8447-7bdc4b45dea7)

- You can also view the task UI without providing a task instance ID, just for checking the layout.
![image](https://github.com/miyasuta/taskui-wrapper/assets/39408125/62d55299-4244-4fc4-83e5-9222423890e3)

