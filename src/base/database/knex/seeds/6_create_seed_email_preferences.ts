import Knex, { Transaction } from "knex";
import EmailPreferenceDao from "../../../../modules/vendorAdmin/adminAndTools/editProfile/daoEmailPreference";
import EmailPreferenceModel from "../../../../modules/vendorAdmin/adminAndTools/editProfile/modelEmailPreference";

export const seedPurchaseOrderId = "5f668fb5-b017-402b-b017-53680f7a2067";

export const seed = function (knex: Knex): Promise<EmailPreferenceModel[]> {
  return new EmailPreferenceDao().upsertMany(knex as Transaction, [
    {
      id: seedPurchaseOrderId,
      mailType: "Purchase order",
    },
    {
      id: "879f2221-3891-4b3b-b764-638e23d3b643",
      mailType: "Receipt",
    },
    {
      id: "234c2d0b-df77-4082-9ab9-5cbd75cb1efa",
      mailType: "Supplier Inventory",
    },
    {
      id: "b1a0b2b9-2015-4fae-99c8-c78ad0111906",
      mailType: "Schedule",
    },
    {
      id: "d8deab66-460d-434e-962d-13b4b883246e",
      mailType: "Quality Control",
    },
    {
      id: "1200b92d-2dbc-4713-8aca-e54903d91699",
      mailType: "Logistics",
    },
    {
      id: "73fd0dc2-65e7-4da7-8fc6-be98ca362049",
      mailType: "Carrier Information",
    },
    {
      id: "7a3f5ef8-da9b-48f3-9339-0768dda200da",
      mailType: "Finance",
    },
    {
      id: "faac6d96-4433-4930-b2f0-105f3adf2a07",
      mailType: "Listing (To Proc Co)",
    },
    {
      id: "aa26ed3f-345b-4e67-b0c3-9969bc881630",
      mailType: "Shipments",
    },
    {
      id: "7f29b007-60f2-4a39-9832-d61e28afe04c",
      mailType: "Listing (To Supplier)",
    },
    {
      id: "63cf364b-5247-4fc3-94f0-1deed7eca8a6",
      mailType: "Supplier Information",
    },
    {
      id: "74b483db-12fa-46ea-a691-6e734d6b9a32",
      mailType: "Confirmed Lines Information",
    },
    {
      id: "46f75799-7470-439d-80d5-3e1f5f75ee1d",
      mailType: "Order Response",
    },
    {
      id: "7e92c1fc-5365-4575-b6b1-32cde11b97ce",
      mailType: "Literature",
    },
    {
      id: "85a2d3a3-4f3f-4c7a-b18b-da30496b3776",
      mailType: "Product Information",
    },
    {
      id: "c6b83a60-4426-4f26-a2fc-ece396f15913",
      mailType: "Invoice Information",
    },
    {
      id: "45a8a0a8-0ce6-40fe-ad1e-48eba8e81178",
      mailType: "Account Information",
    },
    {
      id: "f3b82072-42b8-4baa-9b47-51d136ecebdd",
      mailType: "Part-Price",
    },
    {
      id: "12e22eeb-986a-49f3-b8d1-befa4d52a5a3",
      mailType: "Proc Co Inventory",
    },
    {
      id: "8c9851a4-a638-425b-8d42-c356faa78dc0",
      mailType: "Sales Order Information",
    },
    {
      id: "7f4e9b6c-c808-464b-953e-fd542c0fd409",
      mailType: "Generic Data Group (PPM,...)",
    },
    {
      id: "9ac2d70e-5503-4515-9655-95b74049c0ac",
      mailType: "Rejected Item",
    },
    {
      id: "c7566243-3a29-40b6-9880-aa7487a8d464",
      mailType: "Part Technical Drawing",
    },
    {
      id: "31e04eac-fd3e-4fe4-ab12-c1036208b574",
      mailType: "Request Technical Drawing",
    },
    {
      id: "98cab8ec-4110-4847-8de1-b202626d2f60",
      mailType: "Messages",
    },
    {
      id: "0680d910-773b-4a22-ba19-8b9715cbeb68",
      mailType: "vAT",
    },
    {
      id: "eacbcfea-b9a9-4c3c-b374-242c8f1118e8",
      mailType: "Back Order Summary",
    },
    {
      id: "167f8959-7fee-4220-94b1-917cbb921576",
      mailType: "Confirmation Approval",
    },
    {
      id: "5e127bdd-5fbd-4aa0-9c23-6527037a83bb",
      mailType: "Create Request",
    },
    {
      id: "6fd70e10-3050-4433-8d44-bed1d7e1a068",
      mailType: "Validate Request",
    },
    {
      id: "152ba812-bc96-41fc-9e4e-9e84f1502d10",
      mailType: "Create G8D Report",
    },
    {
      id: "3b35d571-bcb9-4151-ab09-ad956906505a",
      mailType: "Update G8D Report",
    },
    {
      id: "f15a7f3d-f24a-4091-b01d-5898a6fab416",
      mailType: "Closing G8D Report",
    },
    {
      id: "7142cd49-ef45-43b0-8062-013f61a279bb",
      mailType: "G8D Automatic Warning",
    },
    {
      id: "1bdf660a-dbaa-4fbf-9926-c20a554d00d7",
      mailType: "Create SMRR Report",
    },
    {
      id: "2e4b6b78-6183-4746-8038-a0c10733c84b",
      mailType: "Update SMRR Report",
    },
    {
      id: "aacb6cae-6828-4601-ad67-4594cc01ce2d",
      mailType: "Closing SMRR Report",
    },
    {
      id: "2a872e96-c9b0-4b56-bbfe-9775229b2e5d",
      mailType: "PO Auto Warning",
    },
    {
      id: "06cb2cb6-b7aa-4df9-b954-75afe5197289",
      mailType: "Supplier Registration Management",
    },
    {
      id: "373a6bd8-6d75-4606-8e61-e8050d380a54",
      mailType: "Asset Tracking Module",
    },
    {
      id: "0d568680-90c6-421d-b78e-56c3b1a8313d",
      mailType: "Varlık Takip Modülü- Varlık statü güncellemesi",
    },
    {
      id: "e2b73008-05d3-4d15-8ba6-5157f2f91e9a",
      mailType: "Varlık Takip Modülü- Varlık talebi statü güncellemesi",
    },
    {
      id: "9f7d7a9e-f41f-400c-bc18-cdcb26e0f337",
      mailType: "Suggestion Module - New Suggestion Notification",
    },
    {
      id: "d5688161-e5e1-4d0c-94fc-bd784bde248e",
      mailType: "Suggestion Module - Suggestion Update Notification",
    },
    {
      id: "dfa1b821-d29f-45a9-8dd2-e7feac10cfd6",
      mailType: "SMRR Form Supplier Update",
    },
    {
      id: "e6843fa5-1692-4158-b811-5fa463964e5b",
      mailType: "PPAP Status Update",
    },
    {
      id: "e7f6d4a8-a6bf-411b-bba9-f6f103f22341",
      mailType: "Transportation Management Inbound- Loading Plan Notification",
    },
    {
      id: "cf8a628a-1f16-4488-8bac-5593e1e10589",
      mailType: "Outbound-Loading Plan Notification",
    },
    {
      id: "a97121c5-5506-4360-ae6e-8621435b5856",
      mailType: "Transportation Management Inbound- Trip Approval Request",
    },
    {
      id: "f4716018-485c-4ae8-9960-22b91686b712",
      mailType: "Outbound-Trip Approval Request",
    },
    {
      id: "4ece81ce-989b-4a16-a88b-c95b1a4e1b34",
      mailType:
        "Transportation Management Inbound- Trip Plan Approval Notification",
    },
    {
      id: "95423990-a832-4bf3-826e-c5d1bc7f21da",
      mailType: "Outbound-Trip Plan Approval Notification",
    },
    {
      id: "c799d9fd-cc71-496b-bfa0-7ecf22827886",
      mailType: "MilkRun Plan Confirmation Notification",
    },
    {
      id: "cd12bcc9-8d4d-41f8-bac9-4d67eac541b2",
      mailType: "Marketing Notifications",
    },
    {
      id: "777c4e29-9f8d-45fb-84b2-430304cd240a",
      mailType: "Request Sent to Confirmation Notification",
    },
    {
      id: "22436d39-6c7f-430b-9f4b-c68abac47c04",
      mailType: "Request is Sent To Suppliers Notification",
    },
    {
      id: "8c6b5812-a3ed-4992-a299-e15228c2268b",
      mailType: "Request Rejected Notification",
    },
    {
      id: "fed760e8-a5e1-4f58-8e8c-195472ab20bc",
      mailType: "Request Confirmed Notification",
    },
    {
      id: "3adb2610-43b6-4be8-a94f-6e9d57b36a66",
      mailType: "Forwarded Request Replied Notification",
    },
    {
      id: "38affa48-aac3-4bc9-a04c-d6f065f6f5b1",
      mailType: "New Quote Created Notification",
    },
    {
      id: "bb4d3af7-20ef-4d87-9a76-3b4acf27ae26",
      mailType: "Supplier Note In Order Notification",
    },
    {
      id: "18f60d92-2ea3-4533-b1bc-d79ca4e2aad5",
      mailType: "Purchase Order Updated Notification",
    },
    {
      id: "b502224a-c6eb-45c2-9a3a-c9a7d46734b7",
      mailType: "Purchase Order Receipt Acknowledgement Notification",
    },
    {
      id: "ca1e0077-b46f-472e-94e4-d234aacc234c",
      mailType: "Supplier Information Updated Notification",
    },
    {
      id: "203d0f9e-4ba1-40bd-ab4a-a43f2eb97328",
      mailType: "Unconfirmed order",
    },
    {
      id: "06a27341-7bdf-423d-866c-fa54bbd8f427",
      mailType: "VSRM-MRP Update Notification",
    },
    {
      id: "a108cc53-c0a1-446a-8270-8ac80735bf53",
      mailType: "QRR Notifications",
    },
    {
      id: "c307a4ee-f284-4896-8618-5855f509ae69",
      mailType: "G8D Manuel Update",
    },
    {
      id: "48c00cf3-a2f7-4f4a-9e09-c7ef5e92f4dd",
      mailType: "GSA Notification Mails",
    },
    {
      id: "d7caacca-4fb5-47d5-bae3-710d9fe46291",
      mailType: "Literature Approval Mails",
    },
    {
      id: "7cc1fd64-1d23-4feb-85ca-288b1462cfdf",
      mailType: "Sales Order Notification",
    },
    {
      id: "60f9566e-2c5e-49dd-a811-8feff832f59e",
      mailType: "Sales Order Reject Notification",
    },
    {
      id: "345fd4fb-4c9b-46d5-a72a-338ae7da527a",
      mailType: "Sales Order Approval Notification",
    },
    {
      id: "08b0e5f3-5f05-4878-97d4-024cac526e1c",
      mailType: "Reminder Mail For Capacity Approvals",
    },
    {
      id: "c91a203a-c9b5-4f70-88f4-e1728252c150",
      mailType: "Export Shipment Tracking",
    },
    {
      id: "354f4d28-4059-4976-bcfe-d24588b5c863",
      mailType: "Kanban required order alert",
    },
    {
      id: "1026df42-5ba7-4d63-aa75-d3b5bf850de2",
      mailType: "Approval Product Form",
    },
    {
      id: "3ea7aaec-e9d5-4465-a22c-a606a8064b57",
      mailType: "Trip Start Notification",
    },
    {
      id: "c7a82edd-c515-4e42-852c-dae3bdcd80b6",
      mailType: "Outbound-Trip Start Notification",
    },
    {
      id: "b2a590d1-15ec-45d6-8b58-d0471341e207",
      mailType: "Taxing Operation Information",
    },
    {
      id: "7eafe387-cc2c-4325-8c24-e2c80b665468",
      mailType: "Warning e-mail for Kanban Cards",
    },
    {
      id: "dbb0a78e-0934-414a-884d-479117a42d11",
      mailType: "Progress Payment Approval Notification",
    },
    {
      id: "91b501a5-7b3e-4d48-945f-0e9994ebc657",
      mailType: "Contract Approval Mails",
    },
    {
      id: "d1048b5d-f134-49b0-aefd-b6739429c39b",
      mailType: "Catalog Approval",
    },
    {
      id: "541d1f9a-e6ca-43ce-b433-c662c66838a6",
      mailType: "Quality Control Emails",
    },
    {
      id: "dc0ab621-ab92-4af9-bd16-1047f7209395",
      mailType: "Survey Approval Mails",
    },
    {
      id: "02e2080b-522f-41ec-8c2e-a8041001cec1",
      mailType: "Survey Publish Approval Mails",
    },
    {
      id: "d1ed7228-842f-4af2-9007-e1684dae3813",
      mailType: "Survey Publish Mails",
    },
    {
      id: "6a0747ac-8720-4b0f-b8ea-7d8e93ea9ffa",
      mailType: "Survey Publish Reminder Mails",
    },
    {
      id: "e6791f58-2717-4b29-aeed-9c31bac013e4",
      mailType: "Surveillance Planning Reminder Mails",
    },
    {
      id: "6a6ee66b-6fa7-494b-97c9-1c56b7497558",
      mailType: "Summary Of Weekly Quality Control Plans Mail",
    },
    {
      id: "8c6574aa-e205-4c69-b797-5d7054772f1d",
      mailType: "Build To Order",
    },
    {
      id: "d8a7c5f6-bd14-4c41-9d8c-86a61ab035ef",
      mailType: "Ramp Reservation Cancellation Emails",
    },
    {
      id: "7ab33219-6f63-4e9a-8fa7-b8644ffe1e3a",
      mailType: "Ramp Reservation Cancellation Request Emails",
    },
    {
      id: "0d92cb45-7c7a-48fe-aa4b-a699291867e2",
      mailType: "Ramp Reservation Confirmation Emails",
    },
    {
      id: "344a1931-a094-4635-bd10-c80fb7f06b41",
      mailType: "Ramp Reservation Request Emails",
    },
    {
      id: "6c2425f7-14ac-45c8-9c65-196c53fe8860",
      mailType: "Survey Responds",
    },
    {
      id: "62454865-6b37-4782-a9b8-7c5f504d4aaf",
      mailType: "Control List Notification E-mail",
    },
    {
      id: "8c6c7f13-ba7c-4e95-ac97-b5a2eda4d9a4",
      mailType: "Supplier Performance Evaluation",
    },
    {
      id: "bdfe0a3b-7646-4572-ac66-18a537a6fc0a",
      mailType: "Drawing Revision Notice",
    },
    {
      id: "1ea12b37-3efb-4474-859d-3a838cca84a4",
      mailType: "Man Kanban Notice",
    },
    {
      id: "469d927f-9426-4261-b181-4db4ab679779",
      mailType: "Auto Confirmed Order Notification",
    },
    {
      id: "fa1c63db-18f2-4dd1-b350-55c449bac27f",
      mailType: "ASN Appeals Notifications",
    },
    {
      id: "24c2b8b0-4bce-454b-9295-3d196f36dbc7",
      mailType: "Customs Consultancy Mails",
    },
    {
      id: "5df157ca-7da2-4422-811d-0993f27e5ff4",
      mailType: "JIT Documents",
    },
  ]);
};
