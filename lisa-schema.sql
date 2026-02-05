-- -------------------------------------------------------------
-- TablePlus 6.4.2(600)
--
-- https://tableplus.com/
--
-- Database: LISA_CNHPRO2
-- Generation Time: 2025-03-25 15:50:09.0880
-- -------------------------------------------------------------




CREATE TABLE [dbo].[AC_Detail] (
    [Seq] int IDENTITY,
    [Voucher] int,
    [Vendor_Id] varchar(15),
    [Doc_Date] datetime,
    [Doc_No] varchar(20),
    [Doc_Type] varchar(10),
    [Batch] varchar(16),
    [Descrip] varchar(40),
    [PO_No] varchar(15),
    [Terms_Id] varchar(10),
    [Purchase] money,
    [Discount] money,
    [Tax] money,
    [Total] money,
    [Due_Date] datetime,
    [Disc_Date] datetime,
    [Rec_Type] varchar(1),
    [Check_No] varchar(15),
    [Posted] int,
    [Division] varchar(5),
    [Currency] varchar(6),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Accrual_Adj_Header] (
    [Entry_No] int,
    [Vendor_Id] varchar(15),
    [Date] datetime,
    [Location] varchar(10),
    [Trans_Type_Id] varchar(10),
    [Acct_Id] varchar(25),
    [Funds_Id] varchar(50),
    [Exchange_Rate] real,
    [Amount] money,
    [Conv_Amount] money,
    [Descrip] varchar(50),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Time_Stamp] timestamp,
    [Posted] int,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Acct_Reports] (
    [Seq] int IDENTITY,
    [Descrip] varchar(60),
    [Filename] varchar(100),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[AP_Bank_Adjust] (
    [Seq] int IDENTITY,
    [Checkbook_Id] varchar(10),
    [Date] datetime,
    [Descrip] varchar(60),
    [Amount] money,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Bank_Statement] (
    [Seq] int IDENTITY,
    [Checkbook_Id] varchar(10),
    [Date] datetime,
    [Descrip] varchar(50),
    [Statement_Balance] money,
    [GL_Balance] money,
    [Location] varchar(10),
    [Division] varchar(10),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Check] (
    [Seq] int IDENTITY,
    [Batch] varchar(12),
    [Checkno] varchar(12),
    [Supplier] varchar(10),
    [Date] datetime,
    [Currency] varchar(5),
    [Amount] money,
    [Cleared] varchar(1),
    [Cleardate] datetime,
    [Note] varchar(50),
    [Division] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[AP_Checkbook] (
    [Checkbook_Id] varchar(10),
    [Descrip] varchar(40),
    [Bank_Name] varchar(50),
    [Currency_Id] varchar(10),
    [GL_Account] varchar(32),
    [Next_Check_No] int,
    [Bank_Account_No] varchar(30),
    [Location] varchar(10),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Chkrun] (
    [Batch] varchar(12),
    [Seq] int,
    [Vendor] varchar(10),
    [Note] varchar(50),
    [Amount] money,
    [Date] datetime,
    [Currency] varchar(5),
    [Chknum] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Cleared_Checks] (
    [Seq] int IDENTITY,
    [Check_No] varchar(15),
    [Status] varchar(1),
    [Checkbook_Id] varchar(10),
    [Cleared_Date] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Detail] (
    [Voucher] int,
    [Supplier] varchar(10),
    [Supinv] varchar(30),
    [Date] datetime,
    [Doctype] varchar(8),
    [Terms] varchar(10),
    [Duedate] datetime,
    [Discdate] datetime,
    [Ponum] varchar(10),
    [Gross] money,
    [Tax] money,
    [Tax2] money,
    [Net] money,
    [Discount] money,
    [Currency] varchar(5),
    [Batch] varchar(12),
    [History] varchar(1),
    [Posted] varchar(2),
    [Chkbatch] varchar(12),
    [Disctaken] money,
    [Chkseq] int,
    [Reference] varchar(30),
    [Division] varchar(10),
    [Freight] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Dist] (
    [Voucher] int,
    [Seq] smallint,
    [Account] varchar(25),
    [Type] varchar(3),
    [Refno] varchar(10),
    [Volume] real,
    [Amount] money,
    [Descrip] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_History] (
    [Voucher] int,
    [Supplier] varchar(10),
    [Supinv] varchar(30),
    [Date] datetime,
    [Doctype] varchar(8),
    [Terms] varchar(10),
    [Duedate] datetime,
    [Discdate] datetime,
    [Ponum] varchar(10),
    [Gross] money,
    [Net] money,
    [Discount] money,
    [Currency] varchar(5),
    [Batch] varchar(12),
    [History] varchar(1),
    [Posted] varchar(50),
    [Checkno] varchar(12),
    [Disctaken] money,
    [Chkbatch] varchar(12),
    [Reference] varchar(30),
    [Division] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AP_Template_Det] (
    [TemplateName] varchar(20),
    [TempVoucher] int,
    [Seq] smallint,
    [Type] varchar(3),
    [Account] varchar(25),
    [Description] varchar(40),
    [Reference] varchar(10),
    [Amount] money,
    [Volume] real,
    PRIMARY KEY ([TemplateName],[TempVoucher],[Seq])
);



CREATE TABLE [dbo].[AP_Template_Hdr] (
    [TemplateName] varchar(20),
    [TempVoucher] int,
    [Supplier] varchar(10),
    [Reference] varchar(30),
    [Currency] varchar(5),
    [Ten99Type] varchar(5),
    [Ten99Amount] money,
    [Amount] money,
    [Freight] money,
    [Tax1] money,
    [Tax2] money,
    [Terms] varchar(10),
    [Discount] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    PRIMARY KEY ([TemplateName],[TempVoucher])
);



CREATE TABLE [dbo].[App_Object_Detail] (
    [Seq] int IDENTITY,
    [Object_Id] varchar(125),
    [Line_No] int,
    [Line_Data] char(128),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[App_Object_Header] (
    [Object_Id] varchar(125),
    [Descrip] varchar(60),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Version_No] int,
    [Object_Type] varchar(10),
    [Object_Name] varchar(32),
    [Object_Path] varchar(10),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [User_Id] varchar(50),
    PRIMARY KEY ([Object_Id])
);



CREATE TABLE [dbo].[ApplicationTabs] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Application_Id] varchar(40),
    [Xmldata] text,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id],[Application_Id])
);



CREATE TABLE [dbo].[AR_Ajbat_Det] (
    [Batch] varchar(12),
    [Trans] smallint,
    [Seq] smallint,
    [Glacct] varchar(25),
    [Amount] money,
    [Volume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Ajbat_Hdr] (
    [Batch] varchar(12),
    [Trans] smallint,
    [Customer] varchar(10),
    [Date] datetime,
    [Invoice] varchar(12),
    [Applies] varchar(12),
    [Currency] varchar(5),
    [Amount] money,
    [Discount] money,
    [Duedate] datetime,
    [Type] varchar(1),
    [Note] varchar(50),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Balance] (
    [Custid] varchar(10),
    [Balance] money,
    [Aging1] money,
    [Aging2] money,
    [Aging3] money,
    [Aging4] money,
    [Aging5] money,
    [Lastupdate] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Cas_Det] (
    [Batch] varchar(12),
    [Trans] smallint,
    [Seq] smallint,
    [Invoice] varchar(25),
    [Applied] money,
    [Discount] money,
    [Volume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Cas_Hdr] (
    [Batch] varchar(12),
    [Trans] smallint,
    [Customer] varchar(10),
    [Date] datetime,
    [Chqnum] varchar(10),
    [Currency] varchar(5),
    [Amount] money,
    [Note] varchar(50),
    [Misccash] varchar(1),
    [Acctid] varchar(25),
    [Discacct] varchar(25),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Detail] (
    [Customer] varchar(10),
    [Invoice] varchar(12),
    [Seq] smallint,
    [Applies] varchar(12),
    [Date] datetime,
    [Type] varchar(1),
    [Amount] money,
    [Discount] money,
    [Note] varchar(50),
    [Chqnum] varchar(10),
    [History] varchar(1),
    [Currency] varchar(5),
    [Batch] varchar(12),
    [Disccleared] datetime,
    [Origdisc] money,
    [Division] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[AR_Invoice] (
    [Customer] varchar(10),
    [Invoice] varchar(12),
    [Duedate] datetime,
    [Currency] varchar(5),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Bark_Det] (
    [Certnum] varchar(20),
    [Seq] varchar(3),
    [Descrip] varchar(200),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Bark_Hdr] (
    [Certnum] varchar(20),
    [Exporter] varchar(20),
    [Consignee] varchar(50),
    [Shipname] varchar(50),
    [Loadpoint] varchar(50),
    [Impref1] varchar(50),
    [Impref2] varchar(50),
    [Buyernum] varchar(50),
    [Mill] varchar(50),
    [Origin] varchar(50),
    [Exitport] varchar(50),
    [Certdate] datetime,
    [Lotnum] varchar(50),
    [Millnum1] varchar(50),
    [Millnum2] varchar(50),
    [Dest] varchar(50),
    [Destport] varchar(50),
    [Name] varchar(50),
    [Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ConAddress1] varchar(50),
    [ConAddress2] varchar(50),
    [ConAddress3] varchar(50),
    [MillAddress1] varchar(50),
    [MillAddress2] varchar(50),
    [MillAddress3] varchar(50),
    [Type] varchar(1),
    [Tempdesc] varchar(50)
);



CREATE TABLE [dbo].[Batch_Master] (
    [Class] varchar(8),
    [Batch] varchar(8),
    [Status] varchar(1),
    [Date] datetime,
    [Operator] varchar(30),
    [Note] varchar(50),
    [Funds] varchar(3),
    [Division] varchar(10),
    [Multidiv] varchar(2),
    [Reversed] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Billto] (
    [Seq] int IDENTITY,
    [Customer] varchar(10),
    [Shipto] varchar(10),
    [ID] varchar(10),
    [Name] varchar(55),
    [Add1] varchar(55),
    [Add2] varchar(55),
    [City] varchar(55),
    [Province] varchar(10),
    [Postal] varchar(10),
    [Cust_Type] varchar(15),
    [Inactive] smallint,
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Phone] varchar(50),
    [Fax] varchar(50),
    [Country] varchar(50),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Bom_Detail] (
    [Seq] int IDENTITY,
    [Bom_Id] varchar(32),
    [Type] varchar(1),
    [Product_Id] varchar(32),
    [Descrip] varchar(160),
    [Qty] float,
    [Uom] varchar(8),
    [Cost] real,
    [Cost_Amount] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Bom_Header] (
    [Bom_Id] varchar(32),
    [Descrip] varchar(160),
    [Comment] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Bom_Id])
);



CREATE TABLE [dbo].[Booking] (
    [ID] varchar(30),
    [Customer] varchar(10),
    [BookingDate] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [BookingNumber] varchar(40),
    [InvoiceNumber] varchar(25),
    [CompletedDate] datetime,
    [Vessel] varchar(40),
    [Voyage] varchar(10),
    [DestinationPort] varchar(10),
    [Erd] datetime,
    [PaperworkCutOff] datetime,
    [PaperworkCutOffTime] varchar(10),
    [CargoCutOff] datetime,
    [CargoCutOffTime] varchar(10),
    [ShippingLine] varchar(10),
    [NoLateGate] varchar(1),
    [LoadingPort] varchar(10),
    [Drayage] varchar(20),
    [LumberStatus] varchar(5),
    [LumberArrivalDate] datetime,
    [PhytoInspectionReqd] varchar(1),
    [PhytoDate] datetime,
    [PhytoPassed] varchar(1),
    [TallyReady] varchar(1),
    [Status] varchar(5),
    [FullContainersOnly] varchar(1),
    [LoadingYard] varchar(10),
    [Fumigation] varchar(1),
    [PhytoPkgs] int,
    [Notes] text,
    [OrderNo] varchar(15),
    [CustOrderNo] varchar(20),
    [BookingNotes] varchar(200),
    [Loading] varchar(1),
    [LoadingDate] varchar(200),
    [FreightForwarder] varchar(50),
    [InvGrp] varchar(10),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[BookingContainer] (
    [Booking_Id] varchar(10),
    [ContainerType_Id] varchar(10),
    [BookedQuantity] int,
    [Seq] int IDENTITY,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[BookingDrayageCarriers] (
    [Seq] int IDENTITY,
    [Booking_Id] varchar(30),
    [DrayageCarrier_Id] varchar(10),
    [ContainerType_Id] varchar(10),
    [ContainerQty] int,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[BookingReleasedContainers] (
    [ID] varchar(12),
    [ContainerType] varchar(10),
    [ContainerNumber] varchar(30),
    [ReleasedBooking] varchar(30),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Port] varchar(10),
    [Status] varchar(5),
    [InboundReservationNo] varchar(10),
    [OutboundReservationNo] varchar(10),
    [FreightPaid] varchar(1),
    [AssignedBooking] varchar(30),
    [InboundTruckNo] varchar(20),
    [OutboundTruckNo] varchar(20),
    [DeliverySlip_Id] varchar(10),
    [InboundCarrier] varchar(10),
    [OutboundCarrier] varchar(10),
    [PickUpDate] datetime,
    [DropOffDate] datetime,
    [ChassisNo] varchar(50),
    [ReturnedToPort] varchar(10),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Broker] (
    [Broker_Id] varchar(10),
    [Broker_Name] varchar(40),
    [Broker_Add1] varchar(40),
    [Broker_Add2] varchar(40),
    [Broker_Add3] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Broker_Email] varchar(100),
    [City] varchar(30),
    [State] varchar(15),
    [Country] varchar(25),
    [Zipcode] varchar(14),
    [Phone] varchar(25)
);



CREATE TABLE [dbo].[Budget_Detail] (
    [Seq] int IDENTITY,
    [Budget_Id] varchar(10),
    [Year_Id] int,
    [Party_Id] varchar(25),
    [Period_Id] int,
    [Amount] money,
    [Budget_Type] varchar(1),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Budget_Header] (
    [Seq] int IDENTITY,
    [Budget_Id] varchar(10),
    [Year_Id] int,
    [Descrip] varchar(50),
    [Budget_Type] varchar(1),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Change_Log] (
    [Rectype] varchar(8),
    [ID] varchar(16),
    [Invgrp] varchar(10),
    [Date] datetime,
    [Time] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Class] (
    [Classid] varchar(1),
    [Descrip] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Code] (
    [Seq] int IDENTITY,
    [Class] varchar(1),
    [ID] varchar(12),
    [Descrip] varchar(60),
    [Short] varchar(10),
    [Groupid] varchar(10),
    [Sortval] real,
    [Billen] varchar(10),
    [Cracctid] varchar(25),
    [Dracctid] varchar(25),
    [Altdesc] varchar(100),
    [Inactive] smallint,
    [Calcfactor] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Code_Group] (
    [Seq] int IDENTITY,
    [Class] varchar(1),
    [ID] varchar(10),
    [Descrip] varchar(60),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Code_Xref] (
    [Seq] int IDENTITY,
    [Type] varchar(2),
    [Numcode] varchar(5),
    [Lisacode] varchar(8),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Codepick] (
    [Class] varchar(1),
    [Grp] varchar(8),
    [Code] varchar(8),
    [Seq] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Company_Notes] (
    [Seq] int IDENTITY,
    [NoteType] varchar(10),
    [CompanyId] varchar(10),
    [NoteDate] datetime,
    [CommentType] varchar(10),
    [SequenceNumber] int,
    [CommentText] varchar(80),
    [Created_By] varchar(50),
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Created_Date] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Component] (
    [Componentid] varchar(10),
    [Descrip] varchar(50),
    [Type] varchar(1),
    [Unit] varchar(10),
    [Rate] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Config] (
    [ID] varchar(10),
    [Company] varchar(50),
    [Address] varchar(50),
    [City] varchar(50),
    [Phone] varchar(50),
    [Federalid] varchar(30),
    [PartnerId] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Connect_Incoming] (
    [ID] varchar(12),
    [Name] varchar(30),
    [Sourcesite] varchar(12),
    [Filename] varchar(12),
    [Directory] varchar(70),
    [Databasename] varchar(70),
    [Deleteddir] varchar(50),
    [Ordermode] varchar(2),
    [Connectstr] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Connect_Log] (
    [Seq] int IDENTITY,
    [Rectype] varchar(20),
    [Invgrp] varchar(20),
    [Date] datetime,
    [Recid] varchar(20),
    [Userid] varchar(20),
    [Recdata] varchar(2),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Connect_Outgoing] (
    [ID] varchar(12),
    [Name] varchar(30),
    [Destsite] varchar(12),
    [Filename] varchar(12),
    [Directory] varchar(70),
    [Databasename] varchar(70),
    [Connectstr] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Connect_Outtables] (
    [ID] varchar(12),
    [Tableid] varchar(20),
    [Invgrp] varchar(200),
    [Mode] varchar(2),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Contact] (
    [Seq] int,
    [Type] varchar(1),
    [ID] varchar(10),
    [Name] varchar(101),
    [Title] varchar(50),
    [Phone] varchar(50),
    [Extension] varchar(50),
    [Phone2] varchar(50),
    [Fax] varchar(50),
    [Email] varchar(300),
    [Address1] varchar(50),
    [Address2] varchar(50),
    [City] varchar(30),
    [State] varchar(30),
    [ZipCode] varchar(20),
    [Country] varchar(25),
    [Salesman_Id] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [FirstName] varchar(50),
    [LastName] varchar(50),
    [LastContacted] datetime,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ContainerType] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Costcode] (
    [ID] varchar(10),
    [Descrip] varchar(40),
    [Rate] money,
    [Basedon] varchar(4),
    [Usualsup] varchar(10),
    [Usualunit] varchar(10),
    [Acct] varchar(50),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[CostType] (
    [ID] varchar(10),
    [Descrip] varchar(40),
    [DefaultSupplier] varchar(10),
    [DefaultCurrency] varchar(5),
    [DefaultQty] float,
    [DefaultUnit] varchar(6),
    [DefaultRate] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Count_Detail] (
    [Seq] int IDENTITY,
    [ID] varchar(6),
    [Prodid] varchar(6),
    [Type] varchar(4),
    [Lot] varchar(4),
    [Pcs] float,
    [Pcspkg] float,
    [Pkgs] float,
    [Fbm] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Count_Master] (
    [ID] varchar(6),
    [Date] datetime,
    [Invgrp] varchar(10),
    [Name] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Country_Master] (
    [Country_Id] varchar(10),
    [Name] varchar(50),
    [Created_By] varchar(40),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(40),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Country_Id])
);



CREATE TABLE [dbo].[Cred_Chk_Log] (
    [Orderno] varchar(15),
    [Userid] varchar(10),
    [EnterDate] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[CrossProd] (
    [Prodid] varchar(6),
    [Code] varchar(12),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Customer] (
    [Custid] varchar(10),
    [Name] varchar(50),
    [Address] varchar(40),
    [Address2] varchar(40),
    [City] varchar(30),
    [State] varchar(30),
    [Zipcode] varchar(50),
    [Phone] varchar(20),
    [Fax] varchar(20),
    [Contact] varchar(30),
    [Salid] varchar(10),
    [Taxno] varchar(50),
    [Creditlim] float,
    [Gstexempt] varchar(1),
    [Terms] varchar(10),
    [Sendto] varchar(35),
    [Country] varchar(25),
    [Stdmsg] varchar(255),
    [Frtregion] varchar(10),
    [Pricelist] varchar(16),
    [Creditrating] varchar(12),
    [Phone2] varchar(20),
    [Custtype] varchar(10),
    [Creditstat] varchar(2),
    [Taxpercent] varchar(10),
    [Faxorder] varchar(20),
    [Date] datetime,
    [Highestbalance] money,
    [Tottransactions] int,
    [Totdaystopay] int,
    [Arbalance] money,
    [Misc] varchar(50),
    [ModifiedDate] datetime,
    [Print_Statement] smallint,
    [Inactive] smallint,
    [Funds] varchar(5),
    [Budget] money,
    [Email] varchar(300),
    [PartnerId] varchar(20),
    [TransmitEmail] varchar(300),
    [ShortName] varchar(28),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShowStdMsgOnOrders] varchar(1),
    [TaxCode1] varchar(10),
    [TaxCode2] varchar(10),
    [Apemail] varchar(300),
    [Taxno2] varchar(50),
    [Ein_Irs_No] varchar(50),
    [GiveDiscPpdFrt] varchar(1)
);



CREATE TABLE [dbo].[Customer_Type] (
    [Custtype] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[DB_Schema] (
    [ID] varchar(12),
    [PropValue] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Delslip] (
    [Dsid] varchar(15),
    [Date] datetime,
    [Custid] varchar(10),
    [Orderno] varchar(15),
    [Custord] varchar(32),
    [Shipto1] varchar(55),
    [Shipto2] varchar(55),
    [Shipto3] varchar(55),
    [Shipto4] varchar(55),
    [Billto] varchar(55),
    [Container] varchar(30),
    [Seal] varchar(30),
    [Mark] varchar(20),
    [Vessel] varchar(40),
    [Invoice] varchar(15),
    [Shipvia] varchar(35),
    [Custheader] varchar(12),
    [Voyage] varchar(30),
    [Booking] varchar(40),
    [Destin] varchar(35),
    [Truckno] varchar(20),
    [Carrier] varchar(20),
    [Source_Grp] varchar(10),
    [Dest_Grp] varchar(10),
    [Type] varchar(1),
    [Additorder] varchar(80),
    [Note1] varchar(125),
    [Note2] varchar(125),
    [Weight] varchar(40),
    [Tarp] varchar(30),
    [Hardwood] varchar(1),
    [Posted] varchar(1),
    [Stdmsg] varchar(255),
    [Company] varchar(10),
    [Shipto5] varchar(10),
    [Shipto6] varchar(10),
    [Lastshiptime] datetime,
    [Shipfrom] varchar(55),
    [Last_Transmitted] datetime,
    [ShipToPartnerId] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShipMode] varchar(35),
    [BillToSeq] int,
    [Booking_Id] varchar(30),
    [YardLocation_Id] varchar(10),
    [ShippingLine_Id] varchar(10),
    [Pkgs] real,
    [LoadingPort_Id] varchar(10),
    [Container_Id] varchar(12),
    [CargoWeight] real,
    [TareWeight] real,
    [ContainerTypeId] varchar(10),
    [CubicFeet] real,
    [CargoWeightUnit] varchar(6),
    [TareWeightUnit] varchar(6),
    [Fob] varchar(25),
    [ShipToId] varchar(10),
    [Invgrp] varchar(10)
);



CREATE TABLE [dbo].[Delslip_Order] (
    [Delslip] varchar(15),
    [Orderno] varchar(15),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Desktop] (
    [Username] varchar(50),
    [Seq] smallint,
    [Caption] varchar(24),
    [Icontype] varchar(12),
    [Iconimage] smallint,
    [Data] varchar(128),
    [X] float,
    [Y] float,
    [Labelx] float,
    [Labely] float,
    [Office] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[DestinationPort] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Desttype] (
    [ID] varchar(10),
    [Descrip] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Dimen] (
    [ID] varchar(13),
    [Unit] varchar(1),
    [Factor] float,
    [Netmetric] varchar(10),
    [Altdimen] varchar(10),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Direct_Orders] (
    [Dsid] varchar(10),
    [Linenum] int IDENTITY,
    [Descrip] varchar(80),
    [Qty] float,
    [Units] varchar(6),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Division] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Last_Updated] datetime,
    [Active] varchar(2),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Document_Report] (
    [Print_Doc] varchar(20),
    [Report_Id] varchar(50),
    [Num_Copies] int,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [PrinterName] varchar(50),
    PRIMARY KEY ([Print_Doc])
);



CREATE TABLE [dbo].[DrayageCarrier] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Edi_Export] (
    [Report_Id] varchar(50),
    [Report_Name] varchar(60),
    [Xmldata] text,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Active_Status] varchar(1),
    PRIMARY KEY ([Report_Id])
);



CREATE TABLE [dbo].[EtagHistory] (
    [Seq] int IDENTITY,
    [Filename] varchar(300),
    [ProcessedDate] datetime,
    [DocType] varchar(50),
    [DocId] varchar(20),
    [UserId] varchar(40),
    [Note] text,
    [FromPartner] varchar(20),
    [PartnerSourceId] varchar(20),
    [PartnerSourceType] varchar(20),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Exchange_Rates] (
    [Seq] int IDENTITY,
    [Funds_Id] varchar(5),
    [Start_Date] datetime,
    [End_Date] datetime,
    [Exchange_Rate] float,
    [Exchange_Rate_2] float,
    [Factor] float,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Exp_Cargo_Det] (
    [Cargoid] varchar(10),
    [Seq] int IDENTITY,
    [Pkgs] float,
    [Descrip] varchar(200),
    [Weight] float,
    [Rate] real,
    [Advances] real,
    [Prepaid] real,
    [Colect] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Exp_Cargo_Hdr] (
    [Cargoid] varchar(10),
    [Type] varchar(1),
    [Exitport] varchar(50),
    [Intransit] varchar(50),
    [Manifestfrom] varchar(50),
    [Manifestto] varchar(50),
    [Consigneename] varchar(40),
    [Consigneeadd1] varchar(40),
    [Consigneeadd2] varchar(40),
    [Shippername] varchar(40),
    [Shipperadd1] varchar(40),
    [Shipperadd2] varchar(40),
    [Acquittalno1] varchar(50),
    [Acquittalno2] varchar(50),
    [Acquittalno3] varchar(50),
    [Carriercode1] varchar(50),
    [Carriercode2] varchar(50),
    [Carriercode3] varchar(50),
    [Cargocontrol1] varchar(50),
    [Cargocontrol2] varchar(50),
    [Cargocontrol3] varchar(50),
    [Prevcargono] varchar(50),
    [Foreignport1] varchar(50),
    [Foreignport2] varchar(50),
    [Goodslocation] varchar(50),
    [Carriername] varchar(50),
    [Vehicleid] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Exp_Softwood_Det] (
    [Softwoodid] varchar(10),
    [Type] varchar(1),
    [Seq] int IDENTITY,
    [Sbrn] varchar(20),
    [Quotafileno] varchar(15),
    [Commodity] varchar(20),
    [Permitqty] real,
    [Value] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Exp_Softwood_Hdr] (
    [Softwoodid] varchar(10),
    [Type] varchar(1),
    [Orderno] varchar(15),
    [Fileno] varchar(15),
    [Businessno] varchar(15),
    [Date] datetime,
    [Appid] varchar(8),
    [Expname] varchar(50),
    [Address1] varchar(50),
    [Address2] varchar(50),
    [Address3] varchar(50),
    [Address4] varchar(50),
    [Permitno] varchar(15),
    [Transmode] varchar(1),
    [Officerid] varchar(15),
    [Slapayed] varchar(1),
    [Effectivedate] datetime,
    [Entryport] varchar(20),
    [Shipdate] datetime,
    [Entrydate] datetime,
    [Sendto] varchar(1),
    [Expirydate] datetime,
    [Permittobe] varchar(1),
    [Language] varchar(1),
    [Outpost] varchar(20),
    [Docno] varchar(50),
    [Impname] varchar(50),
    [Issued] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Exp_Usoverseas_Det] (
    [Usoverseasid] varchar(20),
    [Seq] int IDENTITY,
    [DF] varchar(5),
    [Scheduleno] varchar(50),
    [Checkdigit] varchar(10),
    [Qty] float,
    [Weight] float,
    [Value] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Exp_Usoverseas_Hdr] (
    [Usoverseasid] varchar(20),
    [Type] varchar(1),
    [Exporter1] varchar(50),
    [Exporter2] varchar(50),
    [Exporter3] varchar(50),
    [Zip] varchar(12),
    [Exporterein] varchar(20),
    [Parties] varchar(1),
    [Exportdate] datetime,
    [Waybillno] varchar(20),
    [Ultimatecon1] varchar(50),
    [Ultimatecon2] varchar(50),
    [Intermediatecon1] varchar(50),
    [Intermediatecon2] varchar(50),
    [Agent1] varchar(50),
    [Agent2] varchar(50),
    [Agent3] varchar(50),
    [Origin] varchar(50),
    [Country] varchar(50),
    [Pier] varchar(20),
    [Transportmode] varchar(20),
    [Carrier] varchar(20),
    [Exportport] varchar(20),
    [Unloadingport] varchar(20),
    [Containerized] varchar(1),
    [Licenseno] varchar(30),
    [Eccn] varchar(20),
    [Officer] varchar(20),
    [Title] varchar(30),
    [Date] datetime,
    [Authentication] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Expdec_Det] (
    [Expref] varchar(20),
    [Linenum] varchar(3),
    [Country] varchar(20),
    [Description] varchar(70),
    [Commcode] varchar(20),
    [Unit] varchar(10),
    [Qty] float,
    [Total] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [DeliverySlip] varchar(15),
    [Invoice] varchar(15),
    [OrderNo] varchar(500),
    [OrderLineId] int,
    [Price] money,
    [ProdId] varchar(6)
);



CREATE TABLE [dbo].[Expdec_Hdr] (
    [Expref] varchar(20),
    [Exporter1] varchar(50),
    [Exporter2] varchar(50),
    [Exporter3] varchar(50),
    [Exporter4] varchar(50),
    [Expno] varchar(20),
    [Finaldest] varchar(40),
    [Custno] varchar(20),
    [Cons] varchar(50),
    [Consadd1] varchar(50),
    [Consadd2] varchar(50),
    [Consadd3] varchar(50),
    [Origin] varchar(40),
    [Exppermit] varchar(20),
    [Pack1] varchar(50),
    [Pack2] varchar(50),
    [Pack3] varchar(50),
    [Expcarrier] varchar(40),
    [Vesselname] varchar(40),
    [Currency] varchar(20),
    [Grossweight] varchar(20),
    [Personresp1] varchar(50),
    [Personresp2] varchar(50),
    [Personresp3] varchar(50),
    [Personresp4] varchar(50),
    [Expdecdate] datetime,
    [Status] varchar(10),
    [Expreason] varchar(40),
    [Estfreight] varchar(20),
    [Transmode] varchar(10),
    [Type] varchar(1),
    [Tempdesc] varchar(50),
    [Other] varchar(50),
    [Container] smallint,
    [Repinc] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [LoadingPort] varchar(10),
    [DischargePort] varchar(10),
    [Etd] datetime,
    [Eta] datetime,
    [OverseasAgent1] varchar(50),
    [OverseasAgent2] varchar(50),
    [OverseasAgent3] varchar(50),
    [OverseasAgent4] varchar(50),
    [TradeAssociation1] varchar(50),
    [TradeAssociation2] varchar(50),
    [TradeAssociation3] varchar(50),
    [TradeAssociation4] varchar(50),
    [ContractNo] varchar(50),
    [BookingNo] varchar(50)
);



CREATE TABLE [dbo].[Export_Ser] (
    [Document] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Export_Sum] (
    [Linenum] int,
    [Date] datetime,
    [Dest] varchar(50),
    [Expnum] varchar(50),
    [Descrip] varchar(70),
    [Qty] float,
    [Unit] varchar(10),
    [Value] float,
    [Currency] varchar(10),
    [Freight] float,
    [Trans] varchar(50),
    [Vessel] varchar(50),
    [Origin] varchar(50),
    [Prov] varchar(20),
    [Exitport] varchar(50),
    [Cont] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[ExportFromCanada_Detail] (
    [Seq] int IDENTITY,
    [ExporterRefNo] varchar(15),
    [Country] varchar(20),
    [Province] varchar(20),
    [ItemDescrip] varchar(300),
    [Htscode] varchar(20),
    [Qty] real,
    [Uom] varchar(10),
    [Pkgs] int,
    [Weight] real,
    [Value] money,
    [Pcs] real,
    [BF] real,
    [LF] real,
    [SF] real,
    [M3] real,
    [PreferenceCriterion] varchar(10),
    [Producer] varchar(10),
    [NetCostRvc] varchar(10),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ExportFromCanada_Header] (
    [ExporterRefNo] varchar(15),
    [BusinessNo] varchar(50),
    [PermitNo] varchar(50),
    [Exporter_Id] varchar(15),
    [Exporter_Contact] varchar(50),
    [Exporter_Phone] varchar(25),
    [Consignee_Id] varchar(15),
    [ConsigneeSame] varchar(1),
    [Consignee_Name] varchar(50),
    [Consignee_Address1] varchar(80),
    [Consignee_Address2] varchar(80),
    [Consignee_City] varchar(30),
    [Consignee_State] varchar(15),
    [Consignee_Country] varchar(25),
    [Consignee_Zipcode] varchar(14),
    [Consignee_Contact] varchar(50),
    [Consignee_Phone] varchar(25),
    [Consignee_TaxId] varchar(50),
    [CountryOfDestination] varchar(10),
    [Carrier_Id] varchar(50),
    [TransportationDocNo] varchar(30),
    [ModeOfTransportation] varchar(1),
    [ModeOfTransport_Other] varchar(50),
    [Vessel_Name] varchar(50),
    [NumberOfPkgs] varchar(50),
    [TypeOfPkgs] varchar(50),
    [ContainerNo] varchar(500),
    [DateOfExportation] datetime,
    [PlaceOfExit] varchar(10),
    [ConveyanceIdNo] varchar(50),
    [Currency] varchar(10),
    [TotalWeight] real,
    [TotalValue] real,
    [FreightCharges] real,
    [ReasonForExport] varchar(250),
    [CustomsProvider_Id] varchar(10),
    [CustomsProvider_Phone] varchar(25),
    [AuthorizedOfficer] varchar(50),
    [AuthorizedTitle] varchar(50),
    [AuthorizedDate] datetime,
    [Authorized_Id] varchar(15),
    [Authorized_Name] varchar(50),
    [Authorized_Address1] varchar(80),
    [Authorized_Address2] varchar(80),
    [Authorized_City] varchar(30),
    [Authorized_State] varchar(15),
    [Authorized_Country] varchar(25),
    [Authorized_Zipcode] varchar(14),
    [Authorized_Phone] varchar(25),
    [Authorized_Fax] varchar(25),
    [Authorized_Status] varchar(1),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(40),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(40),
    [Last_Changed] datetime,
    [Active_Status] varchar(1),
    [LoadedBooking] varchar(30),
    [LoadedBols] varchar(500),
    [LoadedOrders] varchar(500),
    [LoadedInvoices] varchar(500),
    [View_Uom] varchar(3),
    [View_Decimals] int,
    [IsRelated] varchar(1),
    [PaymentTerms] varchar(10),
    [Buyer_Id] varchar(10),
    [Buyer_Contact] varchar(50),
    [Buyer_Phone] varchar(25),
    [Buyer_TaxId] varchar(50),
    [Packaging] money,
    [OceanFreight] money,
    [DomesticFreight] money,
    [Insurance] money,
    [MiscTransport] money,
    [Commission] money,
    [Container] money,
    [Assists] money,
    [Certifications] money,
    [Other] money,
    [OtherCost] varchar(200),
    [TotalCost] money,
    [ChargesBillTo] varchar(1),
    [ChargesBillToOther] varchar(200),
    [BlanketFrom] datetime,
    [BlanketTo] datetime,
    [DestinationPort] varchar(10),
    [Etd] datetime,
    [Eta] datetime,
    PRIMARY KEY ([ExporterRefNo])
);



CREATE TABLE [dbo].[ExportFromCanada_Tag] (
    [Seq] int IDENTITY,
    [ExporterRefNo] varchar(15),
    [Booking_No] varchar(30),
    [Bol_No] varchar(15),
    [Invoice_No] varchar(15),
    [TagNo] varchar(16),
    [TagSeq] int,
    [Order_No] varchar(15),
    [Alt_Descrip] varchar(200),
    [Alt_Qty] float,
    [Product_Id] varchar(32),
    [BF] real,
    [Pcs] real,
    [LF] real,
    [SF] real,
    [M3] real,
    [Weight] real,
    [Lot_No] varchar(50),
    [Tally] varchar(200),
    [Cost] money,
    [Cost_Amount] money,
    [Container_No] varchar(30),
    [Seal_No1] varchar(20),
    [ContainerTypeId] varchar(10),
    [ProductHeader] varchar(2000),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ExportFromUs_Detail] (
    [Seq] int IDENTITY,
    [ExportFromUs_Id] varchar(15),
    [Booking_No] varchar(30),
    [Bol_No] varchar(15),
    [Invoice_No] varchar(15),
    [TagNo] varchar(16),
    [TagSeq] int,
    [Order_No] varchar(15),
    [Alt_Descrip] varchar(200),
    [Alt_Qty] float,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ExportFromUs_Header] (
    [ID] varchar(15),
    [PrincipalParty_Id] varchar(15),
    [PrincipalParty_Ein] varchar(50),
    [IsRelated] varchar(1),
    [DateOfExportation] datetime,
    [TransportationRefNo] varchar(30),
    [UltimateConsignee_Id] varchar(15),
    [IntermediateConsignee_Id] varchar(15),
    [ForwardingAgent_Id] varchar(15),
    [ForwardingAgent_Ein] varchar(50),
    [PointOfOrigin] varchar(2),
    [CountryOfDestination] varchar(10),
    [LoadingPier] varchar(50),
    [MethodOfTransportation] varchar(10),
    [ExportingCarrier_Id] varchar(15),
    [CarrierIdCode] varchar(50),
    [PortOfExport] varchar(10),
    [PortOfUnloading] varchar(10),
    [IsContainerized] varchar(1),
    [ShipmentRefNo] varchar(15),
    [EntryNo] varchar(50),
    [IsHazardousMaterials] varchar(1),
    [InBondCode] varchar(2),
    [IsRoutedExport] varchar(1),
    [LicenseNo] varchar(50),
    [Eccn] varchar(50),
    [AuthorizedOfficer] varchar(50),
    [Title] varchar(50),
    [Date] datetime,
    [Phone] varchar(25),
    [Email] varchar(100),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(40),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(40),
    [Last_Changed] datetime,
    [Active_Status] varchar(1),
    [ConsigneeSame] varchar(1),
    [SoldTo_Id] varchar(15),
    [Vessel_Name] varchar(50),
    [Voyage] varchar(20),
    [Eta] datetime,
    [LoadedBols] varchar(500),
    [LoadedOrders] varchar(500),
    [LoadedInvoices] varchar(500),
    [View_Uom] varchar(3),
    [View_Decimals] int,
    [Loc_Name] varchar(50),
    [Loc_Address1] varchar(50),
    [Loc_Address2] varchar(50),
    [Loc_City] varchar(50),
    [Loc_State] varchar(50),
    [Loc_Country] varchar(50),
    [Loc_Zipcode] varchar(50),
    [Loc_Phone] varchar(50),
    [Loc_Fax] varchar(50),
    [Loc_Number] varchar(50),
    [Show_AltQty] varchar(1),
    [Comment] varchar(200),
    [Show_AltDescrip] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[ExportFromUs_ScheduleB] (
    [Seq] int IDENTITY,
    [ExportFromUs_Id] varchar(15),
    [Fdm] varchar(1),
    [ScheduleBnumber] varchar(20),
    [Descrip] varchar(300),
    [Qty] real,
    [Unit] varchar(10),
    [Pkgs] int,
    [Weight] real,
    [Vin] varchar(50),
    [Value] money,
    [Pcs] real,
    [BF] real,
    [LF] real,
    [SF] real,
    [M3] real,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[External_Count] (
    [ID] int IDENTITY,
    [Tagid] varchar(16),
    [Location] varchar(12),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[External_Shipped] (
    [Seq] int IDENTITY,
    [Orderno] varchar(15),
    [Tagid] varchar(16),
    [Dsnum] varchar(15),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[ExternalReportTypes] (
    [Subscriber_Id] int,
    [ID] varchar(10),
    [Description] varchar(60),
    [LaunchUrl] text,
    [LastChanged] datetime,
    [LastChangedBy] varchar(40),
    [CreatedDate] datetime,
    [CreatedBy] varchar(40),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[ID])
);



CREATE TABLE [dbo].[Fbm_Pc] (
    [Species] varchar(10),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Lenid] varchar(10),
    [Fbmpc] float,
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Fcmodel_Detail] (
    [Modelid] varchar(14),
    [Categ1] varchar(40),
    [Categ2] varchar(40),
    [Categ3] varchar(40),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Mixpercent] float,
    [Child] varchar(1),
    [Descrip] varchar(30),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Fcmodel_Header] (
    [Modelid] varchar(14),
    [Type] varchar(1),
    [Descrip] varchar(80),
    [Startdate] datetime,
    [Days] real,
    [Totvolume] float,
    [Delay] real,
    [Invgrp] varchar(10),
    [Machine] varchar(10),
    [Complete] varchar(1),
    [Basemodel] varchar(14),
    [Operdays] varchar(7),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Fcrun_Data] (
    [Modelid] varchar(14),
    [Invgrp] varchar(10),
    [Date] datetime,
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Volume] float,
    [Pkgs] float,
    [Weeknum] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[File_Storage] (
    [FileName] varchar(40),
    [Contents] image,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [FileType] varchar(10),
    [Description] varchar(100),
    PRIMARY KEY ([FileName])
);



CREATE TABLE [dbo].[Fob] (
    [Fob_Id] varchar(25),
    [Descrip] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(40),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(40),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Fob_Id])
);



CREATE TABLE [dbo].[Freight_Liability] (
    [Car] varchar(15),
    [Invoiceid] varchar(10),
    [Custid] varchar(10),
    [Invoicedate] datetime,
    [Dest] varchar(6),
    [Routing] varchar(30),
    [Complete] varchar(1),
    [Liability] money,
    [Waybill] varchar(15),
    [Freightprepaid] varchar(30),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Freight_Rate] (
    [Dest] varchar(6),
    [Routing] varchar(30),
    [Contract] varchar(15),
    [Cartype] varchar(10),
    [Rate] money,
    [Expirydate] datetime,
    [Note] varchar(200),
    [City] varchar(30),
    [State] varchar(30),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Frtregion] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Rate] float,
    [Taxcode] varchar(10),
    [Description1] varchar(255),
    [Description2] varchar(255),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [RateCalculation] varchar(1)
);



CREATE TABLE [dbo].[Funds] (
    [ID] varchar(5),
    [Descrip] varchar(25),
    [Rate] float,
    [Factor] float,
    [Rate2] float,
    [Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[GL_Masking] (
    [Post_Id] varchar(10),
    [Lookup_Table] varchar(10),
    [Acct_Mask] varchar(25),
    [Seq] int IDENTITY,
    [Lookup_Value] varchar(20),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[GL_Postacct] (
    [Code] varchar(10),
    [Curr] varchar(6),
    [Acct] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[GL_Postacct_Div] (
    [Code] varchar(10),
    [Curr] varchar(6),
    [Multidiv] varchar(2),
    [Acct] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Glbalance] (
    [Acctid] varchar(25),
    [Division] varchar(4),
    [Fiscyear] smallint,
    [Fiscmon] smallint,
    [Amount] money,
    [Volume] float,
    [Exported] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Glbatch] (
    [Batch] varchar(8),
    [Seq] smallint,
    [Acctid] varchar(25),
    [Division] varchar(4),
    [Descrip] varchar(50),
    [Reference] varchar(30),
    [Amount] money,
    [Volume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Gldetail] (
    [Acctid] varchar(25),
    [Division] varchar(4),
    [Date] datetime,
    [Fiscyear] smallint,
    [Fiscmon] smallint,
    [Seq] smallint,
    [Source] varchar(8),
    [Batch] varchar(12),
    [Reference] varchar(30),
    [Descrip] varchar(50),
    [Name] varchar(50),
    [Amount] money,
    [Volume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Glmaster] (
    [Acctid] varchar(25),
    [Name] varchar(50),
    [Alias] varchar(16),
    [Subledge] varchar(6),
    [Jeonly] varchar(1),
    [Currency] varchar(5),
    [Categ] varchar(8),
    [Posttype] varchar(1),
    [Usualbal] varchar(1),
    [Sysacct] varchar(10),
    [Postable] varchar(1),
    [Segment1] varchar(25),
    [Segment2] varchar(25),
    [Segment3] varchar(25),
    [Active_Status] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1)
);



CREATE TABLE [dbo].[Glsymtab] (
    [Symacct] varchar(25),
    [Acctid] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Glyear] (
    [Fisyear] varchar(6),
    [Firstday] datetime,
    [Lastday] datetime,
    [Status] varchar(1),
    [Periods] smallint,
    [Perdesc1] varchar(30),
    [Perdate1] datetime,
    [Perstat1] varchar(10),
    [Perdesc2] varchar(30),
    [Perdate2] datetime,
    [Perstat2] varchar(10),
    [Perdesc3] varchar(30),
    [Perdate3] datetime,
    [Perstat3] varchar(10),
    [Perdesc4] varchar(30),
    [Perdate4] datetime,
    [Perstat4] varchar(10),
    [Perdesc5] varchar(30),
    [Perdate5] datetime,
    [Perstat5] varchar(10),
    [Perdesc6] varchar(30),
    [Perdate6] datetime,
    [Perstat6] varchar(10),
    [Perdesc7] varchar(30),
    [Perdate7] datetime,
    [Perstat7] varchar(10),
    [Perdesc8] varchar(30),
    [Perdate8] datetime,
    [Perstat8] varchar(10),
    [Perdesc9] varchar(30),
    [Perdate9] datetime,
    [Perstat9] varchar(10),
    [Perdesc10] varchar(30),
    [Perdate10] datetime,
    [Perstat10] varchar(10),
    [Perdesc11] varchar(30),
    [Perdate11] datetime,
    [Perstat11] varchar(10),
    [Perdesc12] varchar(30),
    [Perdate12] datetime,
    [Perstat12] varchar(10),
    [Perdesc13] varchar(30),
    [Perdate13] datetime,
    [Perstat13] varchar(10),
    [Perdesc14] varchar(30),
    [Perdate14] datetime,
    [Perstat14] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[HamptonProductSummary] (
    [GrpId] varchar(22),
    [ProdId] varchar(22),
    [DefUnit] varchar(3),
    [UnitCost] decimal(17,2),
    [TotalCost] decimal(17,2),
    [Volume] decimal(18,3),
    [Descrip] varchar(200),
    [Fbm] decimal(18,0),
    [Pcs] int,
    [Pkgs] int,
    [M3] decimal(18,3),
    [SM] decimal(18,0),
    [Lin] decimal(18,0),
    [UserId] varchar(50)
);



CREATE TABLE [dbo].[Heat_Det] (
    [Certnum] varchar(20),
    [Seq] varchar(3),
    [Descrip] varchar(200),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Heat_Hdr] (
    [Certnum] varchar(20),
    [Exporter] varchar(20),
    [Consignee] varchar(50),
    [Shipname] varchar(50),
    [Loadpoint] varchar(50),
    [Impref1] varchar(50),
    [Impref2] varchar(50),
    [Buyernum] varchar(50),
    [Mill] varchar(50),
    [Origin] varchar(50),
    [Exitport] varchar(50),
    [Certdate] datetime,
    [Lotnum] varchar(50),
    [Millnum1] varchar(50),
    [Millnum2] varchar(50),
    [Dest] varchar(50),
    [Destport] varchar(50),
    [Name] varchar(50),
    [Date] datetime,
    [Certopt] smallint,
    [CfiaregNo] varchar(50),
    [RegroupedCert] varchar(1),
    [TreatmentCert] varchar(1),
    [DunnageCert] varchar(1),
    [Euonly] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ConAddress1] varchar(50),
    [ConAddress2] varchar(50),
    [ConAddress3] varchar(50),
    [MillAddress1] varchar(50),
    [MillAddress2] varchar(50),
    [MillAddress3] varchar(50),
    [Type] varchar(1),
    [Tempdesc] varchar(50)
);



CREATE TABLE [dbo].[Htscode] (
    [Htscode] varchar(20),
    [Description] varchar(50),
    [Duty] int,
    [Species] varchar(10),
    [Milling] varchar(10),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Inv_Acct_Setup] (
    [Invgrp] varchar(10),
    [Inventoryacct] varchar(25),
    [Shipmentsacct] varchar(25),
    [Remanacct] varchar(25),
    [Accruedacct] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Inv_Acctlog] (
    [Seq] int IDENTITY,
    [Date] datetime,
    [Status] varchar(1),
    [Invgrp] varchar(10),
    [Qty] float,
    [Amount] float,
    [Ref] varchar(16),
    [Type] varchar(20),
    [Imported] varchar(1),
    [Tagid] varchar(16),
    [Dest] varchar(30),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Invent_Freeze] (
    [Prodid] varchar(8),
    [Invgrp] varchar(10),
    [Yardloc] varchar(10),
    [Date] datetime,
    [Fbm] real,
    [M3] real,
    [Lin] real,
    [SM] real,
    [Pcs] real,
    [Value] float,
    [Counter] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [AsAtDate] datetime
);



CREATE TABLE [dbo].[Invgrp] (
    [Grpid] varchar(10),
    [Name] varchar(40),
    [Phone] varchar(20),
    [Fax] varchar(20),
    [Address] varchar(50),
    [Address2] varchar(50),
    [City] varchar(25),
    [State] varchar(10),
    [Postal] varchar(14),
    [Tagfield1] varchar(50),
    [Tagfield2] varchar(50),
    [Tagfield3] varchar(50),
    [Subacctid] varchar(25),
    [Inactive] smallint,
    [Custid] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [FreightRegion] varchar(10)
);



CREATE TABLE [dbo].[Invoice_Code] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Chggst] varchar(1),
    [Chgpst] varchar(1),
    [Givedis] varchar(1),
    [Price] float,
    [Defunit] varchar(6),
    [Qtytotal] varchar(1),
    [Glcode] varchar(25),
    [Commission] varchar(1),
    [Bold] varchar(1),
    [Spacing] real,
    [Excludefromtot] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [SalesDepartment] int
);



CREATE TABLE [dbo].[Invoice_Costs] (
    [ID] varchar(15),
    [Seq] varchar(4),
    [Date] datetime,
    [Supplier] varchar(10),
    [Type] varchar(10),
    [Qty] float,
    [Unit] varchar(6),
    [Price] float,
    [Amount] float,
    [Funds] varchar(5),
    [Descrip] varchar(40),
    [Paid] tinyint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Invoice_Delslip] (
    [Invoice] varchar(15),
    [Delslip] varchar(15),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Invoice_Det] (
    [Seq] int IDENTITY,
    [ID] varchar(15),
    [Linenum] varchar(8),
    [Code] varchar(10),
    [Descrip] varchar(200),
    [Unit] varchar(6),
    [Qty] float,
    [Price] float,
    [Amount] float,
    [Orderno] varchar(30),
    [Misccol1] varchar(20),
    [Misccol2] varchar(20),
    [Partno] varchar(35),
    [Pkgs] float,
    [Pcspkg] float,
    [Tally] varchar(200),
    [Type] varchar(1),
    [Rawprice] money,
    [Extradesc] varchar(40),
    [Len1] varchar(10),
    [Len2] varchar(10),
    [PW] varchar(5),
    [Gradest] varchar(5),
    [Prodid] varchar(6),
    [Invgrp] varchar(10),
    [Orderline] smallint,
    [Pcs] real,
    [Generated] varchar(2),
    [Style] varchar(12),
    [Itemfrt] money,
    [Itemfrtcalc] varchar(1),
    [Lineid] int,
    [ExportPrice] money,
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Fbm] real,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Invoice_Glpost] (
    [Seq] int IDENTITY,
    [Code1] varchar(12),
    [Code2] varchar(12),
    [Code3] varchar(12),
    [Glcode] varchar(25),
    [Note] varchar(128),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Invoice_Hdr] (
    [ID] varchar(15),
    [Date] datetime,
    [Orderno] varchar(500),
    [Soldto] varchar(10),
    [Shipto] varchar(10),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Custord] varchar(20),
    [Type] varchar(5),
    [Terms] varchar(10),
    [Shipdate] datetime,
    [Delslip] varchar(500),
    [Subtot] float,
    [Gst] float,
    [Pst] float,
    [Total] float,
    [Chggst] smallint,
    [Chgpst] smallint,
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(50),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Orddate] datetime,
    [Ppdfrt] float,
    [Discount] float,
    [Duedate] datetime,
    [Funds] varchar(5),
    [Exchrate] float,
    [Company] varchar(10),
    [Salesman] varchar(12),
    [Batch] varchar(8),
    [Posted] varchar(1),
    [Printed] varchar(10),
    [Invgrp] varchar(10),
    [Frtcost] float,
    [Othercost] float,
    [Frtcostm] float,
    [Othercostm] float,
    [Totfbm] float,
    [Frtregion] varchar(10),
    [Desttype] varchar(10),
    [Stdmsg] varchar(255),
    [Taxcode1] varchar(10),
    [Taxrate1] money,
    [Taxcode2] varchar(10),
    [Taxrate2] money,
    [Override] smallint,
    [Weight] float,
    [Costexchrate] float,
    [Ship_Phone] varchar(50),
    [Contact] varchar(50),
    [ExportDate] datetime,
    [PermitNo] varchar(20),
    [ExportExchangeRate] real,
    [RunId] varchar(15),
    [RunInput] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShipVia] varchar(35),
    [ShipMode] varchar(35),
    [BillTo] varchar(55),
    [BillToSeq] int,
    [Booking_Id] varchar(30),
    [BookingNumber] varchar(40),
    [BookingDate] datetime,
    [Vessel] varchar(40),
    [Voyage] varchar(10),
    [DestinationPort] varchar(10),
    [LoadingPort] varchar(10),
    [YardLocation] varchar(10),
    [Internal_Invoice] varchar(1),
    [Total_Fbm] real,
    [Locked] varchar(1),
    [Locked_Date] datetime,
    [DiscountDate] datetime,
    [Fob] varchar(25),
    [Status] varchar(1),
    [Comment1] varchar(125),
    [Comment2] varchar(125),
    [WasReversed] varchar(1),
    [ReversedInvoice] varchar(15),
    [OriginalInvoice] varchar(15),
    [Sent_Date] datetime,
    [BorderDocFee] float
);



CREATE TABLE [dbo].[Invoice_Type] (
    [ID] varchar(5),
    [Descrip] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[JE_Detail] (
    [Batch] varchar(12),
    [Entryno] int,
    [Seq] int,
    [Acct] varchar(25),
    [Descrip] varchar(50),
    [Amount] money,
    [Volume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[JE_Hdr] (
    [Batch] varchar(12),
    [Entryno] int,
    [Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[JE_Template] (
    [Templateid] varchar(20),
    [Seq] int,
    [Acct] varchar(25),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Lisa_Apdetail] (
    [Logseq] smallint,
    [Supplier] varchar(10),
    [Supinv] varchar(30),
    [Date] datetime,
    [Doctype] varchar(8),
    [Terms] varchar(10),
    [Duedate] datetime,
    [Discdate] datetime,
    [Ponum] varchar(10),
    [Gross] money,
    [Tax] money,
    [Tax2] money,
    [Net] money,
    [Discount] money,
    [Currency] varchar(5),
    [Batch] varchar(10),
    [History] varchar(1),
    [Posted] varchar(2),
    [Chkbatch] varchar(8),
    [Disctaken] money,
    [Chkseq] int,
    [Reference] varchar(30),
    [Division] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Lisa_Apdist] (
    [Logseq] smallint,
    [Supplier] varchar(10),
    [Seq] smallint,
    [Account] varchar(25),
    [Type] varchar(3),
    [Refno] varchar(10),
    [Volume] real,
    [Amount] money,
    [Descrip] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Lisa_Gljournal] (
    [Logseq] smallint,
    [Glaccount] varchar(25),
    [Dborcr] tinyint,
    [Amount] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Lisalink] (
    [Invgrp] varchar(10),
    [Sendtables] varchar(255),
    [Ltdate] datetime,
    [Sendto] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[LoadingPort] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Location] (
    [Locid] varchar(10),
    [Descrip] varchar(40),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [AllowLineupExport] varchar(1)
);



CREATE TABLE [dbo].[Lodgepole] (
    [Seq] int IDENTITY,
    [Tip] varchar(10),
    [Butt] varchar(10),
    [Factor] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Log_Consume] (
    [Date] datetime,
    [Shift] varchar(4),
    [Line] varchar(1),
    [Pcs] int,
    [M3] float,
    [Avgdiameter] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[LogBoom] (
    [ID] varchar(20),
    [PurchaseDate] datetime,
    [Supplier] varchar(10),
    [Location] varchar(30),
    [InvoiceNumber] varchar(20),
    [Notes] text,
    [TotalVolume] float,
    [TotalPcs] float,
    [TotalBundles] float,
    [TotalSections] float,
    [BoomSticks] float,
    [BoomSticksVolume] float,
    [Chains] float,
    [SwifterWires] float,
    [OtherBoomGear] float,
    [Fspercent] float,
    [BoomStickCost] money,
    [LogCost] money,
    [ScalingCost] money,
    [TowingCost] money,
    [ChainsCost] money,
    [SwifterWiresCost] money,
    [AdditionalCosts] money,
    [VolumeRemaining] float,
    [TotalCost] money,
    [Status] varchar(1),
    [GeographicOrigin] varchar(35),
    [IsPaid] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [InvGrp] varchar(10),
    [Cut] varchar(15),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[LogBoomSort] (
    [Seq] int IDENTITY,
    [LogBoom_Id] varchar(20),
    [SortId] varchar(50),
    [Species] varchar(10),
    [Bundles] float,
    [Pcs] float,
    [Volume] float,
    [Price] money,
    [Amount] money,
    [VolumeRemaining] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[LogBoomSortConsumption] (
    [Seq] int IDENTITY,
    [LogBoom_Id] varchar(20),
    [Sort_Id] varchar(50),
    [Run_Id] varchar(15),
    [ConsumedDate] datetime,
    [ConsumedVolume] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Logscale] (
    [Logid] varchar(12),
    [Cutno] varchar(12),
    [Date] datetime,
    [Pcs] real,
    [Length] float,
    [Topwid] float,
    [Buttwid] float,
    [Grade] varchar(12),
    [M3] float,
    [Shift] varchar(8),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[LogSort] (
    [Seq] int IDENTITY,
    [Name] varchar(50),
    [Species] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Machine] (
    [ID] varchar(10),
    [Name] varchar(40),
    [Analyze] varchar(1),
    [Department] varchar(30),
    [Sort] real,
    [Inactive] smallint,
    [IncludeInSchedule] varchar(1),
    [HoursPerDay] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[MachineAvailability] (
    [MachineId] varchar(10),
    [AvailableDate] datetime,
    [AvailableHours] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([MachineId],[AvailableDate])
);



CREATE TABLE [dbo].[Mill_Address] (
    [Seq] int IDENTITY,
    [Supplier] varchar(10),
    [Millcode] varchar(10),
    [Name] varchar(40),
    [Address] varchar(40),
    [Address2] varchar(40),
    [City] varchar(30),
    [State] varchar(20),
    [Postal] varchar(12),
    [Phone] varchar(25),
    [Fax] varchar(25),
    [Contact] varchar(25),
    [Country] varchar(25),
    [Taxno] varchar(15),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Millcert_Det] (
    [Ship_Ref] varchar(20),
    [Seq] varchar(2),
    [Description] varchar(70),
    [Tally] varchar(200),
    [Fbm] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Millcert_Hdr] (
    [Ship_Ref] varchar(20),
    [Mill] varchar(50),
    [Location] varchar(50),
    [Date] datetime,
    [Mcfor] varchar(50),
    [Vessel] varchar(50),
    [Destination] varchar(50),
    [Stowage] varchar(50),
    [Lot_Mark] varchar(50),
    [Dock] varchar(50),
    [Mcrule] varchar(50),
    [Disc1] varchar(100),
    [Disc2] varchar(100),
    [Disc3] varchar(100),
    [Disc4] varchar(100),
    [Disc5] varchar(100),
    [Disc6] varchar(100),
    [Disc7] varchar(100),
    [Disc8] varchar(100),
    [Disc9] varchar(100),
    [Disc10] varchar(100),
    [Total_Fbm] float,
    [Tempdesc] varchar(50),
    [Type] varchar(5),
    [Pkgs] varchar(100),
    [Tallygrid] smallint,
    [Pkggrid] smallint,
    [Signline] smallint,
    [Showdate] smallint,
    [Showbot] smallint,
    [Title] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[NL_Product] (
    [Seq] int IDENTITY,
    [Partid] varchar(35),
    [Type] varchar(2),
    [Groupid] varchar(16),
    [Descrip] varchar(50),
    [Vendor] varchar(10),
    [Cost] money,
    [Unit] varchar(6),
    [Price] money,
    [Invcode] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[NL_Qty] (
    [Partid] varchar(35),
    [Invgrp] varchar(10),
    [Avgcost] money,
    [Value] money,
    [Qty] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [M3] real
);



CREATE TABLE [dbo].[NL_Trans] (
    [Refno] varchar(20),
    [Seq] int,
    [Type] varchar(2),
    [Partid] varchar(35),
    [Date] datetime,
    [Qty] real,
    [Cost] money,
    [Extcost] money,
    [Invgrp] varchar(10),
    [Landed] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [M3] real
);



CREATE TABLE [dbo].[NL_Transfer_Det] (
    [Transferid] varchar(10),
    [Partid] varchar(35),
    [Qty] float,
    [Process] varchar(1),
    [Seq] int IDENTITY,
    [Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [M3] real
);



CREATE TABLE [dbo].[NL_Transfer_Hdr] (
    [Transferid] varchar(10),
    [Date] datetime,
    [Oldinvgrp] varchar(10),
    [Newinvgrp] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Notes] (
    [Idtype] varchar(10),
    [ID] varchar(16),
    [Seq] int,
    [Memotext] varchar(80),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[ObjectNotes] (
    [Subscriber_Id] int,
    [ObjectId] varchar(40),
    [RecordId] varchar(80),
    [Seq] int IDENTITY,
    [NoteText] text,
    [NoteType] varchar(10),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[Seq])
);



CREATE TABLE [dbo].[ObjectRevisions] (
    [Subscriber_Id] int,
    [ObjectId] varchar(40),
    [RecordId] varchar(32),
    [LineSeq] int,
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [MessageText] varchar(120),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[Seq])
);



CREATE TABLE [dbo].[ObjectSearchSettings] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Object_Id] varchar(60),
    [Xmldata] text,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id],[Object_Id])
);



CREATE TABLE [dbo].[ObjectUserReports] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Object_Id] varchar(60),
    [Report_Id] varchar(50),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id],[Object_Id],[Report_Id])
);



CREATE TABLE [dbo].[Operator] (
    [Operatorid] varchar(50),
    [Operatorname] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Operatorid])
);



CREATE TABLE [dbo].[Options] (
    [ID] varchar(50),
    [Param] varchar(1000),
    [Option_Id] varchar(80),
    [Value] varchar(180),
    [User_Id] varchar(50),
    [Seq] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Option_Seq] int
);



CREATE TABLE [dbo].[Options_Classic] (
    [ID] varchar(50),
    [Param] varchar(240),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Order_Costs] (
    [ID] varchar(15),
    [Seq] varchar(4),
    [Date] datetime,
    [Supplier] varchar(10),
    [Type] varchar(10),
    [Qty] float,
    [Unit] varchar(6),
    [Price] float,
    [Amount] float,
    [Funds] varchar(5),
    [Descrip] varchar(40),
    [Paid] tinyint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Order_Det] (
    [Seq] int IDENTITY,
    [ID] varchar(15),
    [Linenum] varchar(8),
    [Code] varchar(10),
    [Descrip] varchar(200),
    [Unit] varchar(6),
    [Qty] float,
    [Price] float,
    [Amount] float,
    [Orderno] varchar(30),
    [Prodid] varchar(6),
    [Len1] varchar(10),
    [Len2] varchar(10),
    [Partno] varchar(35),
    [Pkgs] varchar(8),
    [Pcspkg] float,
    [Tally] varchar(200),
    [Type] varchar(1),
    [Status] varchar(1),
    [PW] varchar(5),
    [Gradest] varchar(5),
    [Generated] varchar(1),
    [Include] varchar(1),
    [Qtytext] varchar(25),
    [Rldist] varchar(10),
    [Rawprice] money,
    [Extradesc] varchar(40),
    [Antdate] datetime,
    [Invgrp] varchar(10),
    [Lineupdate] datetime,
    [Lineid] int,
    [Mastid] int,
    [Qtypcs] real,
    [Cost] real,
    [Billlen] varchar(12),
    [Itemfrt] money,
    [Style] varchar(12),
    [Pts] varchar(3),
    [Cust_Price] money,
    [Quota] int,
    [WorkOrderId] varchar(15),
    [TargetProduction] float,
    [TrimLossPerc] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [LocId] varchar(10),
    [ProductionPackagingNotes] text,
    [Weight] float,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Order_Hdr] (
    [ID] varchar(15),
    [Date] datetime,
    [Soldto] varchar(10),
    [Shipto] varchar(10),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Custord] varchar(20),
    [Type] varchar(5),
    [Terms] varchar(10),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(35),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Funds] varchar(5),
    [Datereq] datetime,
    [Status] varchar(1),
    [Company] varchar(10),
    [Salesman] varchar(12),
    [Exchrate] float,
    [Ppdfrt] money,
    [Ppdmode] varchar(1),
    [Ppdtype] varchar(8),
    [Commission] real,
    [Invgrp] varchar(10),
    [Nextlineid] int,
    [Prodsum] varchar(30),
    [Revno] int,
    [Revdate] datetime,
    [Revuser] varchar(10),
    [Pricelistid] varchar(16),
    [Stdmsg] varchar(255),
    [Readystat] varchar(2),
    [Readydate] datetime,
    [Calldate] datetime,
    [Recalldate] datetime,
    [Pendate] datetime,
    [Comment] varchar(125),
    [Callcontact] varchar(25),
    [Dest] varchar(6),
    [Contract] varchar(15),
    [Hardwood] varchar(1),
    [Hwpercent] float,
    [Shipadd5] varchar(20),
    [Ship_Phone] varchar(50),
    [Billto] varchar(10),
    [Billtoname] varchar(55),
    [Tot_Weight] float,
    [Contact] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShipVia] varchar(35),
    [ShipMode] varchar(35),
    [TrackNo] varchar(35),
    [Routing] varchar(35),
    [LocId] varchar(10),
    [BillToSeq] int,
    [ExpiryDate] datetime,
    [Ponumber] varchar(15),
    [QuoteId] varchar(15),
    [ProductionPackagingNotes] text,
    [Comment2] varchar(125),
    [Fob] varchar(25)
);



CREATE TABLE [dbo].[OrderDataChanges] (
    [Seq] int IDENTITY,
    [OrderId] varchar(15),
    [IsHeader] varchar(1),
    [LineId] int,
    [FieldName] varchar(50),
    [PreviousValue] varchar(500),
    [NewValue] varchar(500),
    [UserId] varchar(40),
    [DateChanged] datetime,
    [LineDesc] varchar(500),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[PageLayoutAssignments] (
    [Subscriber_Id] int,
    [Object_Id] varchar(40),
    [Profile_Id] varchar(10),
    [Configuration] varchar(40),
    [PageLayout] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[Object_Id],[Profile_Id])
);



CREATE TABLE [dbo].[Part] (
    [Seq] int IDENTITY,
    [Custid] varchar(10),
    [Partno] varchar(35),
    [Prodid] varchar(6),
    [Width] varchar(13),
    [Thick] varchar(13),
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Thickval] float,
    [Widval] float,
    [Lensort] float,
    [Description] varchar(85),
    [Bundles] float,
    [Pcsperbundle] float,
    [Pcsperunit] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Binlocation] varchar(20),
    [Unit] varchar(6),
    [InvoiceCode] varchar(10),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Part_Comp_Det] (
    [Seq] int IDENTITY,
    [Custid] varchar(10),
    [Partno] varchar(35),
    [Componentid] varchar(10),
    [Qty] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Part_Cost] (
    [ID] varchar(35),
    [Descrip] varchar(80),
    [Unit] varchar(6),
    [Price] float,
    [Qty] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[PartnerLengthXref] (
    [PartnerId] varchar(20),
    [PartnerLength] varchar(10),
    [LocalLength] varchar(10),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([PartnerId],[PartnerLength])
);



CREATE TABLE [dbo].[PartnerProductXref] (
    [PartnerId] varchar(20),
    [Descrip] varchar(200),
    [LenFrom] real,
    [LenTo] real,
    [PartnerProductId] varchar(32),
    [LocalProductId] varchar(32),
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([PartnerId],[Descrip],[LenFrom],[LenTo])
);



CREATE TABLE [dbo].[Pdf_Files] (
    [Doc_Type] varchar(10),
    [Doc_Id] varchar(15),
    [File_Location] varchar(1000),
    [File_Name] varchar(100),
    [Descrip] varchar(200),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Peelerpole] (
    [Size] varchar(10),
    [Factor] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Pkgsize] (
    [Seq] int IDENTITY,
    [Thick] varchar(13),
    [Width] varchar(13),
    [Lengrp] varchar(10),
    [Milling] varchar(10),
    [Pcs] float,
    [Fbm] float,
    [Species] varchar(10),
    [Grade] varchar(12),
    [State] varchar(10),
    [Tagstationid] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[PO_Costs] (
    [ID] varchar(15),
    [Seq] varchar(4),
    [Date] datetime,
    [Supplier] varchar(10),
    [Type] varchar(10),
    [Qty] float,
    [Unit] varchar(6),
    [Price] float,
    [Amount] float,
    [Funds] varchar(5),
    [Descrip] varchar(40),
    [Paid] tinyint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[PO_Det] (
    [Seq] int IDENTITY,
    [ID] varchar(15),
    [Linenum] varchar(8),
    [Code] varchar(10),
    [Descrip] varchar(200),
    [Unit] varchar(6),
    [Qty] float,
    [Price] float,
    [Amount] float,
    [Orderno] varchar(30),
    [Prodid] varchar(6),
    [Len1] varchar(10),
    [Len2] varchar(10),
    [Pkgs] varchar(8),
    [Pcspkg] float,
    [Tally] varchar(200),
    [Type] varchar(1),
    [Status] varchar(1),
    [PW] varchar(5),
    [Gradest] varchar(5),
    [Generated] varchar(1),
    [Include] varchar(1),
    [Qtytext] varchar(25),
    [Rldist] varchar(10),
    [Rawprice] money,
    [Extradesc] varchar(40),
    [Invgrp] varchar(10),
    [Lineupdate] datetime,
    [Lineid] int,
    [Mastid] int,
    [Qtypcs] real,
    [Style] varchar(12),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [LocId] varchar(10),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[PO_Hdr] (
    [ID] varchar(15),
    [Date] datetime,
    [Supplier] varchar(10),
    [Shipto] varchar(10),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Suppord] varchar(20),
    [Type] varchar(1),
    [Terms] varchar(10),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(50),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Funds] varchar(5),
    [Datereq] datetime,
    [Shipment] varchar(30),
    [Status] varchar(1),
    [Company] varchar(10),
    [Salesman] varchar(12),
    [Mill] varchar(10),
    [Invgrp] varchar(10),
    [Prodsum] varchar(30),
    [Stdmsg] varchar(255),
    [Posted] varchar(1),
    [Mill_Supplier] varchar(10),
    [Date_Modified] datetime,
    [Contact] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShipVia] varchar(35),
    [ShipMode] varchar(35),
    [Ship_Phone] varchar(50),
    [LocId] varchar(10),
    [ExpiryDate] datetime,
    [SalesOrderNumber] varchar(15),
    [FileNo] varchar(15),
    [Freight] money,
    [FreightMode] varchar(1)
);



CREATE TABLE [dbo].[PO_Price] (
    [Prodid] varchar(6),
    [Market] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Port] (
    [Port_Id] varchar(10),
    [Port_Name] varchar(40),
    [Port_Add1] varchar(40),
    [Port_Add2] varchar(40),
    [Port_Add3] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Port_Email] varchar(100),
    [City] varchar(30),
    [State] varchar(15),
    [Country] varchar(25),
    [Zipcode] varchar(14),
    [Phone] varchar(25)
);



CREATE TABLE [dbo].[Price_Code] (
    [Seq] int IDENTITY,
    [Listcode] varchar(16),
    [Prodid] varchar(6),
    [Invcode] varchar(10),
    [Unit] varchar(6),
    [Lvl] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Price_Det] (
    [Pricelistid] varchar(16),
    [Partno] varchar(35),
    [Lengrp] varchar(10),
    [Price] money,
    [Qty] float,
    [Note] varchar(255),
    [CalcSets] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Price_Hdr] (
    [Pricelistid] varchar(16),
    [Descript] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Price_Master] (
    [Seq] int IDENTITY,
    [Prodid] varchar(6),
    [Unit] varchar(6),
    [Invcode] varchar(10),
    [Lvl] smallint,
    [Price] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Pricefile] (
    [Invgrp] varchar(10),
    [Fileno] varchar(15),
    [Prodid] varchar(6),
    [Price] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Prod_Book] (
    [Revision] int,
    [Seq] smallint,
    [ID] int,
    [Descrip] varchar(50),
    [Type] varchar(3),
    [Parent] int,
    [Data] varchar(60),
    [Stindex] smallint,
    [Size] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Prod_Days] (
    [Seq] int IDENTITY,
    [ShiftDate] datetime,
    [Shift] varchar(15),
    [Days] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Prodperday] (
    [Seq] int IDENTITY,
    [Prodid] varchar(8),
    [Length] varchar(8),
    [Fbmperday] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ProdScheduleDetail] (
    [Seq] int IDENTITY,
    [WorkOrderId] varchar(15),
    [Qty] float,
    [LengthGroup] varchar(10),
    [TrimLossPerc] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ProdScheduleHeader] (
    [WorkOrderId] varchar(15),
    [MachineId] varchar(10),
    [ProfileId] varchar(12),
    [StartDate] datetime,
    [EndDate] datetime,
    [Duration] real,
    [IsLocked] varchar(1),
    [TotalLf] float,
    [Status] varchar(1),
    [SequenceOrder] int,
    [TotalValue] float,
    [SetupTime] real,
    [AdditionalTime] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([WorkOrderId])
);



CREATE TABLE [dbo].[Product] (
    [Prodid] varchar(6),
    [Width] varchar(13),
    [Descrip] varchar(200),
    [Gradgrp] varchar(10),
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Thick] varchar(16),
    [Sku] varchar(16),
    [Thickval] float,
    [Widval] float,
    [Gradedesc] varchar(30),
    [Lensort] real,
    [Defunit] varchar(2),
    [Specgrp] varchar(10),
    [Millgrp] varchar(10),
    [Desiredlin] float,
    [Speciesdesc] varchar(30),
    [Millingdesc] varchar(60),
    [Statedesc] varchar(30),
    [Lengrpdesc] varchar(30),
    [Altthickdesc] varchar(10),
    [Altwidthdesc] varchar(10),
    [Date_Created] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ProductGroup_Id] varchar(20),
    [NetThick] varchar(13),
    [NetWidth] varchar(13),
    [NetFactor] real,
    [NetSffactor] real
);



CREATE TABLE [dbo].[Product_Comp_Det] (
    [Prodid] varchar(6),
    [Componentid] varchar(10),
    [Qty] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Product_Comp_Hdr] (
    [Prodid] varchar(6),
    [Bundles] real,
    [Pcsperbundle] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Product_Price] (
    [Seq] int IDENTITY,
    [Prodid] varchar(8),
    [Length] varchar(10),
    [Cost] float,
    [Market] float,
    [Lastchange] datetime,
    [Avgcost] float,
    [CostPerPc] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Product_Pricehist] (
    [Seq] int IDENTITY,
    [Pricelistid] varchar(10),
    [Prodid] varchar(8),
    [Length] varchar(10),
    [Cost] float,
    [Market] float,
    [Lastchange] datetime,
    [Avgcost] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[ProductGroup] (
    [ID] varchar(20),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [DefaultInvoiceCode] varchar(10),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[ProductGroup_Attrib] (
    [Seq] int IDENTITY,
    [ProductGroup_Id] varchar(20),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Species] varchar(50),
    [Grade] varchar(50),
    [Milling] varchar(50),
    [State] varchar(50),
    [LenGrp] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Production_Report] (
    [ID] varchar(30),
    [Machine] varchar(10),
    [Column] varchar(6),
    [Data] varchar(220),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Profile] (
    [Profile] varchar(12),
    [Purchfactor] float,
    [Awfactor] float,
    [Nscfactor] float,
    [Invoicecode] varchar(10),
    [Species] varchar(10),
    [Bundlesize] real,
    [PreferredMachineId] varchar(10),
    [SetupTime] real,
    [QtyPerHour] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Thickness] varchar(10),
    [Width] varchar(10),
    [BlankThickness] varchar(10),
    [BlankWidth] varchar(10),
    [PlugThickness] varchar(10),
    [PlugWidth] varchar(10),
    [NominalThickness] varchar(10),
    [NominalWidth] varchar(10),
    [PcsPerBlank] float
);



CREATE TABLE [dbo].[ProfilePrivilegeChanges] (
    [Seq] int IDENTITY,
    [ActionName] varchar(10),
    [ObjectName] varchar(40),
    [ItemName] varchar(60),
    [Profile_Id] varchar(10),
    [ActionId] varchar(10),
    [ChangedBy] varchar(40),
    [ChangedDate] datetime,
    [Subscriber_Id] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq],[Subscriber_Id])
);



CREATE TABLE [dbo].[ProfilePrivileges] (
    [Subscriber_Id] int,
    [Profile_Id] varchar(10),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    [Permission_Id] varchar(80),
    [ActionGranted] varchar(40),
    PRIMARY KEY ([Subscriber_Id],[Profile_Id],[Permission_Id],[ActionGranted])
);



CREATE TABLE [dbo].[Profiles] (
    [Subscriber_Id] int,
    [ID] varchar(10),
    [Description] varchar(60),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[ID])
);



CREATE TABLE [dbo].[Proforma] (
    [Counter] int IDENTITY,
    [ID] varchar(24),
    [Rectype] varchar(5),
    [Descrip] varchar(60),
    [Rate] float,
    [Based] varchar(2),
    [Value] float,
    [Volume] float,
    [Countloss] float,
    [Fibreloss] float,
    [Goesto] varchar(16),
    [Process] smallint,
    [Linenum] smallint,
    [Percent] float,
    [Prodid] varchar(8),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Proforma_Process] (
    [Counter] int IDENTITY,
    [Name] varchar(24),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Program] (
    [Program] varchar(15),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Quota_Det] (
    [Seq] int IDENTITY,
    [Quotaid] varchar(10),
    [Mill] varchar(10),
    [Refno] varchar(10),
    [Volume] real,
    [Type] varchar(2),
    [Note] varchar(50),
    [Date] datetime,
    [Quotatype] varchar(3),
    [Province] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Quote_Det] (
    [ID] varchar(10),
    [Linenum] varchar(8),
    [Code] varchar(10),
    [Descrip] varchar(80),
    [Unit] varchar(6),
    [Qty] float,
    [Price] float,
    [Amount] float,
    [Orderno] varchar(16),
    [Prodid] varchar(6),
    [Len1] varchar(10),
    [Len2] varchar(10),
    [Partno] varchar(35),
    [Pkgs] varchar(8),
    [Pcspkg] float,
    [Tally] varchar(200),
    [Type] varchar(1),
    [Status] varchar(1),
    [PW] varchar(5),
    [Gradest] varchar(5),
    [Generated] varchar(1),
    [Include] varchar(1),
    [Qtytext] varchar(25),
    [Rldist] varchar(10),
    [Rawprice] money,
    [Extradesc] varchar(40),
    [Antdate] datetime,
    [Invgrp] varchar(10),
    [Lineupdate] datetime,
    [Lineid] int,
    [Mastid] int,
    [Qtypcs] real,
    [Cost] real,
    [Billlen] varchar(12),
    [Itemfrt] money,
    [Style] varchar(12),
    [Pts] varchar(3),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Quote_Detail] (
    [Seq] int IDENTITY,
    [ID] varchar(15),
    [Linenum] varchar(8),
    [Code] varchar(10),
    [Descrip] varchar(200),
    [Unit] varchar(6),
    [Qty] float,
    [Price] float,
    [Amount] float,
    [Orderno] varchar(30),
    [Prodid] varchar(6),
    [Len1] varchar(10),
    [Len2] varchar(10),
    [Partno] varchar(35),
    [Pkgs] varchar(8),
    [Pcspkg] float,
    [Tally] varchar(200),
    [Type] varchar(1),
    [Status] varchar(1),
    [PW] varchar(5),
    [Gradest] varchar(5),
    [Generated] varchar(1),
    [Include] varchar(1),
    [Qtytext] varchar(25),
    [Rldist] varchar(10),
    [Rawprice] money,
    [Extradesc] varchar(40),
    [Antdate] datetime,
    [Invgrp] varchar(10),
    [Lineupdate] datetime,
    [Lineid] int,
    [Mastid] int,
    [Qtypcs] real,
    [Cost] real,
    [Billlen] varchar(12),
    [Itemfrt] money,
    [Style] varchar(12),
    [Pts] varchar(3),
    [Cust_Price] money,
    [Quota] int,
    [WorkOrderId] varchar(15),
    [TargetProduction] float,
    [TrimLossPerc] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [LocId] varchar(10),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Quote_Hdr] (
    [ID] varchar(10),
    [Date] datetime,
    [Soldto] varchar(10),
    [Shipto] varchar(10),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Custord] varchar(20),
    [Type] varchar(1),
    [Terms] varchar(10),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(35),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Funds] varchar(1),
    [Datereq] datetime,
    [Status] varchar(1),
    [Company] varchar(10),
    [Salesman] varchar(12),
    [Exchrate] float,
    [Ppdfrt] money,
    [Ppdmode] varchar(1),
    [Ppdtype] varchar(8),
    [Commission] real,
    [Invgrp] varchar(10),
    [Nextlineid] int,
    [Prodsum] varchar(30),
    [Revno] int,
    [Revdate] datetime,
    [Revuser] varchar(10),
    [Pricelistid] varchar(16),
    [Stdmsg] varchar(35),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Quote_Header] (
    [ID] varchar(15),
    [Date] datetime,
    [Soldto] varchar(10),
    [Shipto] varchar(10),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Custord] varchar(20),
    [Type] varchar(1),
    [Terms] varchar(10),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(35),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Funds] varchar(5),
    [Datereq] datetime,
    [Status] varchar(1),
    [Company] varchar(10),
    [Salesman] varchar(12),
    [Exchrate] float,
    [Ppdfrt] money,
    [Ppdmode] varchar(1),
    [Ppdtype] varchar(8),
    [Commission] real,
    [Invgrp] varchar(10),
    [Nextlineid] int,
    [Prodsum] varchar(30),
    [Revno] int,
    [Revdate] datetime,
    [Revuser] varchar(10),
    [Pricelistid] varchar(16),
    [Stdmsg] varchar(255),
    [Readystat] varchar(2),
    [Readydate] datetime,
    [Calldate] datetime,
    [Recalldate] datetime,
    [Pendate] datetime,
    [Comment] varchar(40),
    [Callcontact] varchar(25),
    [Dest] varchar(6),
    [Contract] varchar(15),
    [Hardwood] varchar(1),
    [Hwpercent] float,
    [Shipadd5] varchar(20),
    [Ship_Phone] varchar(50),
    [Billto] varchar(10),
    [Billtoname] varchar(55),
    [Tot_Weight] float,
    [Contact] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [ShipVia] varchar(35),
    [ShipMode] varchar(35),
    [TrackNo] varchar(35),
    [Routing] varchar(35),
    [LocId] varchar(10),
    [BillToSeq] int,
    [ExpiryDate] datetime,
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[RecentItems] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Xmldata] text,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id])
);



CREATE TABLE [dbo].[ReleasedContainerProducts] (
    [Seq] int IDENTITY,
    [ReleasedContainer_Id] varchar(12),
    [Product_Id] varchar(6),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Booking_Id] varchar(30),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Report_List] (
    [User_Id] varchar(50),
    [Report_Id] varchar(50),
    [Report_Name] varchar(60),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([User_Id],[Report_Id])
);



CREATE TABLE [dbo].[ReportDefinitions] (
    [Subscriber_Id] int,
    [ID] varchar(80),
    [Name] varchar(120),
    [Type] varchar(10),
    [Format] varchar(10),
    [Xmldata] text,
    [LastChanged] datetime,
    [LastChangedBy] varchar(40),
    [CreatedDate] datetime,
    [CreatedBy] varchar(40),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[ID])
);



CREATE TABLE [dbo].[ReportProfiles] (
    [Subscriber_Id] int,
    [Report_Id] varchar(50),
    [Profile_Id] varchar(10),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[Report_Id],[Profile_Id])
);



CREATE TABLE [dbo].[Reports] (
    [Class] varchar(16),
    [Name] varchar(40),
    [Seq] smallint,
    [Rectype] varchar(10),
    [Data] varchar(128),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[RL_Dist] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Lengrp01] varchar(8),
    [Lengrp02] varchar(10),
    [Lengrp03] varchar(10),
    [Lengrp04] varchar(10),
    [Lengrp05] varchar(10),
    [Lengrp06] varchar(8),
    [Lengrp07] varchar(8),
    [Lengrp08] varchar(8),
    [Lengrp09] varchar(8),
    [Lengrp10] varchar(8),
    [Lengrp11] varchar(8),
    [Lengrp12] varchar(8),
    [Percent01] real,
    [Percent02] real,
    [Percent03] real,
    [Percent04] real,
    [Percent05] real,
    [Percent06] real,
    [Percent07] real,
    [Percent08] real,
    [Percent09] real,
    [Percent10] real,
    [Percent11] real,
    [Percent12] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Run_Description] (
    [Seq] int IDENTITY,
    [Descrip] varchar(50),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Runcost] (
    [Runid] varchar(15),
    [Seq] varchar(3),
    [Date] datetime,
    [Costcode] varchar(10),
    [Supplier] varchar(10),
    [Descrip] varchar(40),
    [Qty] float,
    [Qtyunit] varchar(6),
    [Auto] varchar(2),
    [Rate] float,
    [Amount] float,
    [Shift] varchar(5),
    [Funds] varchar(5),
    [Converted] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [MarketVariance] float,
    [ExchRate] real,
    [IsNonLumber] varchar(1)
);



CREATE TABLE [dbo].[Runhdr] (
    [ID] varchar(15),
    [File] varchar(15),
    [Date] datetime,
    [Descrip] varchar(50),
    [Type] varchar(1),
    [Supplier] varchar(10),
    [Invgrp] varchar(10),
    [Machine] varchar(10),
    [Salesman] varchar(12),
    [Program] varchar(10),
    [Status] varchar(1),
    [Lot] varchar(50),
    [Custwo] varchar(15),
    [Ponum] varchar(15),
    [Totinval] float,
    [Totchg] float,
    [Costunit] varchar(1),
    [Costbylen] smallint,
    [Purdisc] float,
    [Invoice] varchar(15),
    [Shift] varchar(10),
    [Costmethod] varchar(10),
    [Purchamt] money,
    [Findate] datetime,
    [User1] varchar(30),
    [User2] varchar(30),
    [User3] varchar(30),
    [Runtime] real,
    [Createout] varchar(3),
    [Exchrate] float,
    [Currency] varchar(5),
    [Exchrate2] float,
    [Pricelen] smallint,
    [Machineid] varchar(10),
    [Posted] varchar(1),
    [Istransfer] varchar(1),
    [Newlot] varchar(10),
    [Newstate] varchar(10),
    [Newlocid] varchar(10),
    [Company] varchar(10),
    [Locked] smallint,
    [Date_Modified] datetime,
    [Completed] smallint,
    [Profile] varchar(12),
    [Isblanking] smallint,
    [WorkOrderId] varchar(15),
    [Last_Transmitted] datetime,
    [Frozencost] money,
    [Totcost] money,
    [Profitcost] money,
    [Totmarket] money,
    [Profitmarket] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [NumberOfShifts] real,
    [CostPerShift] money,
    [AdditionalCosts] money,
    [ChipPrice] money,
    [ChipFactor] real,
    [ScanFactor] real,
    [Note1] text,
    [Note2] text,
    [Priority] varchar(50),
    [InboundSize] varchar(50),
    [Species] varchar(10),
    [Grade] varchar(10),
    [State] varchar(10),
    [Price] money,
    [Volume] real,
    [PackagingInstructions] text,
    [Comments] text,
    [SpecialInstructions] text,
    [AttachHtdunnage] varchar(1),
    [ClearEndWax] varchar(1),
    [CornerProtect] varchar(1),
    [EndSeal] varchar(1),
    [ExportStrapping] varchar(1),
    [LoadLgthMark] varchar(1),
    [StencilMark] varchar(1),
    [PaperCap] varchar(1),
    [PaperWrap] varchar(1),
    [PaperWrapCustomers] varchar(1),
    [PolyUnderTopTier] varchar(1),
    [StretchSeal] varchar(1),
    [ShippingDate] datetime,
    [NewGrade] varchar(10),
    [NewMilling] varchar(10),
    [SuppOrd] varchar(20),
    [TagPrefix] varchar(5),
    [ManualVolIn] float,
    [ManualValueInput] float,
    [Custid] varchar(10),
    [FromInvGrp] varchar(10),
    [ConsumedTagValue] float,
    [Pofreight] money,
    [PofreightMode] varchar(1),
    [InventoryReturn] varchar(1),
    [ReturnInvoice] varchar(15),
    [TotInValNl] float,
    [TotChgNl] float,
    [TotCostNl] float,
    [ProfitCostNl] float
);



CREATE TABLE [dbo].[Runinput] (
    [Seq] int IDENTITY,
    [Runid] varchar(15),
    [Inputdate] datetime,
    [Shiftid] varchar(2),
    [Machineid] varchar(10),
    [Operatorid] varchar(40),
    [Lfinput] real,
    [Runtime] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Runline] (
    [Seq] int IDENTITY,
    [Runid] varchar(15),
    [Sort] varchar(3),
    [Date] datetime,
    [Prodid] varchar(6),
    [Locid] varchar(10),
    [Type] varchar(1),
    [Lot] varchar(50),
    [Customer] varchar(10),
    [Partno] varchar(35),
    [Other] varchar(14),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [GradeMark] varchar(50),
    [SawnSize] varchar(50),
    [Wane] varchar(50),
    [Fohc] varchar(50),
    [VolumeRequired] real,
    [Lathe] varchar(50),
    [PkgSize] varchar(50),
    [Container] varchar(1),
    [Wrap] varchar(50),
    [EndSeal] varchar(50),
    [Destination] varchar(50),
    [OrderNo] varchar(15),
    [Notes] varchar(200),
    [Grades] varchar(200),
    [Widths] varchar(200),
    [Lengths] varchar(200),
    [Interface] varchar(30),
    [LineId] int,
    [TimberTracker] varchar(1),
    [EstPercent] real,
    [EstSales] money,
    [Brand] varchar(1),
    [TrimLossPercent] real,
    [EstRemanCost] money,
    [SawnThick] varchar(13),
    [SawnWidth] varchar(13),
    [InvoiceThick] varchar(13),
    [InvoiceWidth] varchar(13),
    [PcsTally] varchar(200),
    [IsTemplate] varchar(1),
    [BundleSize] real,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Runline_Code] (
    [Seq] int IDENTITY,
    [Type] varchar(50),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Runline_Combination] (
    [Seq] int IDENTITY,
    [Type] varchar(50),
    [Combination] varchar(200),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Runprod] (
    [Runid] varchar(15),
    [Prodid] varchar(6),
    [Length] varchar(10),
    [Tally] varchar(200),
    [Cost] float,
    [Market] float,
    [Force] varchar(50),
    [Purmarket] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Runtime] (
    [Date] datetime,
    [Shift] varchar(3),
    [Machine] varchar(10),
    [Runno] varchar(15),
    [Runtime] float,
    [Downtime] float,
    [Comment] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[RW_Detail] (
    [Seq] int IDENTITY,
    [Report_Id] varchar(50),
    [Line_No] int,
    [Line_Data] char(128),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[RW_Header] (
    [Report_Id] varchar(50),
    [Report_Type] varchar(1),
    [Base_Template] varchar(15),
    [Report_Name] varchar(60),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Version_No] int,
    [ExternalReportType_Id] varchar(10),
    [ReportFolder_Id] varchar(25),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    PRIMARY KEY ([Report_Id])
);



CREATE TABLE [dbo].[Safety] (
    [Date] datetime,
    [FA] smallint,
    [MA] smallint,
    [Lta] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Salesman] (
    [ID] varchar(12),
    [Name] varchar(40),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Security_Group_Members] (
    [Facility_Id] varchar(10),
    [User_Id] varchar(50),
    [Group_Id] varchar(10),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Seq] int IDENTITY,
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [User_String_1] varchar(40),
    [User_String_2] varchar(40),
    [User_String_3] varchar(40),
    [User_String_4] varchar(40),
    [User_String_5] varchar(40),
    [User_Numeric_1] real,
    [User_Numeric_2] real,
    [User_Date_1] datetime,
    [User_Date_2] datetime,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Group_Members_Log] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [Action_Name] varchar(10),
    [Group_Id] varchar(10),
    [Facility_Id] varchar(10),
    [Changed_By] varchar(50),
    [Changed_Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Groups] (
    [Group_Id] varchar(10),
    [Group_Descrip] varchar(60),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [User_String_1] varchar(40),
    [User_String_2] varchar(40),
    [User_String_3] varchar(40),
    [User_String_4] varchar(40),
    [User_String_5] varchar(40),
    [User_Numeric_1] real,
    [User_Numeric_2] real,
    [User_Date_1] datetime,
    [User_Date_2] datetime,
    PRIMARY KEY ([Group_Id])
);



CREATE TABLE [dbo].[Security_Groups_Log] (
    [Seq] int IDENTITY,
    [Group_Id] varchar(10),
    [Action_Name] varchar(10),
    [Changed_By] varchar(50),
    [Changed_Date] datetime,
    [Field_Name] varchar(50),
    [Previous_Value] varchar(80),
    [New_Value] varchar(80),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Item_Priv] (
    [Seq] int IDENTITY,
    [Group_Id] varchar(10),
    [User_Id] varchar(50),
    [Item_Type] varchar(10),
    [Item_Id] varchar(50),
    [Allow_Open] smallint,
    [Allow_Save] smallint,
    [Allow_Delete] smallint,
    [Allow_Edit] smallint,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Login_Log] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [Action_Name] varchar(40),
    [Login_Date] datetime,
    [Logout_Date] datetime,
    [Application_Name] varchar(10),
    [Application_Version] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Privileges] (
    [Seq] int IDENTITY,
    [Object_Name] varchar(40),
    [Item_Name] varchar(60),
    [Action_Id] varchar(10),
    [Group_Id] varchar(10),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Privileges_Log] (
    [Seq] int IDENTITY,
    [Action_Name] varchar(10),
    [Object_Name] varchar(40),
    [Item_Name] varchar(60),
    [Group_Id] varchar(10),
    [Action_Id] varchar(10),
    [Changed_By] varchar(50),
    [Changed_Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Pwd_History] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [New_Password] varchar(40),
    [Date_Changed] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Security_Users] (
    [User_Id] varchar(50),
    [User_Name] varchar(40),
    [Group_Id] varchar(10),
    [Location] varchar(10),
    [Password] varchar(20),
    [Pin_No] varchar(10),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Is_Shipper] varchar(1),
    [Is_Mill_Operator] varchar(1),
    [Allow_Login] varchar(1),
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Is_Developer] varchar(1),
    [Home_Facility_Id] varchar(10),
    [Allow_Multi_Mill] varchar(1),
    [Pwd_Last_Changed] datetime,
    [Pwd_Never_Expires] varchar(1),
    [Invalid_Login_Count] int,
    [Account_Disabled] varchar(1),
    [Pwd_Force_Change] varchar(1),
    [Last_Successful_Login] datetime,
    [Salesman_Code] varchar(12),
    [User_Type_Id] varchar(10),
    PRIMARY KEY ([User_Id])
);



CREATE TABLE [dbo].[Security_Users_Log] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [Action_Name] varchar(10),
    [Changed_By] varchar(50),
    [Changed_Date] datetime,
    [Field_Name] varchar(50),
    [Previous_Value] varchar(80),
    [New_Value] varchar(80),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Seqnum] (
    [ID] varchar(15),
    [Descrip] varchar(50),
    [Nextnum] float,
    [Prefix] varchar(4),
    [Suffix] varchar(4),
    [Active] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [UseTagFormula] varchar(1),
    [TagFormula] varchar(16),
    [YearDigits] int,
    [NumberOfDigits] int,
    [ResetNumber] varchar(1)
);



CREATE TABLE [dbo].[SequenceNumbers] (
    [Subscriber_Id] int,
    [ID] varchar(40),
    [NextNumber] int,
    [Prefix] varchar(10),
    [Suffix] varchar(10),
    [IsActive] varchar(1),
    [Description] varchar(40),
    [MinimumDigits] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[ID])
);



CREATE TABLE [dbo].[Settings] (
    [Subscriber_Id] int,
    [ID] varchar(80),
    [User_Id] varchar(50),
    [Site_Id] varchar(10),
    [SettingValue] varchar(800),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[ID],[User_Id],[Site_Id])
);



CREATE TABLE [dbo].[Shift] (
    [Shiftid] varchar(2),
    [Descrip] varchar(50),
    [StartTime] smalldatetime,
    [EndTime] smalldatetime,
    [Is_Overnight] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Shiftid])
);



CREATE TABLE [dbo].[ShipMode] (
    [ID] int IDENTITY,
    [Name] varchar(35),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [TareWeight] real,
    [GrossWeight] real,
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Shipped] (
    [Orderno] varchar(15),
    [Lineid] smallint,
    [Qty] float,
    [Fbm] float,
    [Lin] float,
    [M3] float,
    [SM] float,
    [Linm] float,
    [Pcs] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[ShippingLine] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Shipto] (
    [Seq] int IDENTITY,
    [Customer] varchar(10),
    [ID] varchar(10),
    [Name] varchar(55),
    [Add1] varchar(55),
    [Add2] varchar(55),
    [Add3] varchar(55),
    [Frtregion] varchar(10),
    [Desttype] varchar(10),
    [Taxno] varchar(15),
    [Std_Msg_Id] varchar(255),
    [Inactive] smallint,
    [Phone] varchar(50),
    [User1] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [TrackNo] varchar(35),
    [Routing] varchar(35),
    [TaxCode1] varchar(10),
    [TaxCode2] varchar(10),
    [Email] varchar(300),
    [Fax] varchar(20),
    [Contact] varchar(30),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Shipto_Supplier] (
    [Seq] int IDENTITY,
    [Supplier] varchar(10),
    [ID] varchar(10),
    [Name] varchar(55),
    [Add1] varchar(55),
    [Add2] varchar(55),
    [Add3] varchar(55),
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Phone] varchar(50),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Shipvia] (
    [ID] int IDENTITY,
    [Name] varchar(35),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[ShipViaFreightRate] (
    [ID] int IDENTITY,
    [FromFreightRegion] varchar(10),
    [ToFreightRegion] varchar(10),
    [ShipVia] varchar(35),
    [Rate] money,
    [RateCalcMethod] varchar(1),
    [Funds_Id] varchar(5),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Smtable] (
    [Seq] int IDENTITY,
    [Thickness] varchar(13),
    [Milling] varchar(10),
    [Fbmfactor] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Snapshot_Header] (
    [ID] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Snapshot_Tag] (
    [Snapshot_Id] datetime,
    [Tagid] varchar(16),
    [Status] varchar(1),
    [Source] varchar(15),
    [Sourcedate] datetime,
    [Sourceshift] varchar(4),
    [Locid] varchar(10),
    [Grpid] varchar(10),
    [Orderno] varchar(15),
    [Lot] varchar(50),
    [Tallyunit] varchar(1),
    [Volunit] varchar(1),
    [Dest] varchar(15),
    [Destdate] datetime,
    [Destshift] varchar(4),
    [Bundle] real,
    [Pkglen] varchar(10),
    [Pcs] real,
    [Lin] real,
    [Fbm] real,
    [Sellen] varchar(10),
    [Sellenval] real,
    [Pkglenval] real,
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Type] varchar(1),
    [Other] varchar(14),
    [Thick] varchar(13),
    [Width] varchar(13),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Partno] varchar(35),
    [Pcspkg] real,
    [Sellprice] money,
    [Syscode] varchar(3),
    [Ship_Prodid] varchar(8),
    [Lineid] int,
    [Subid] varchar(12),
    [Calcas] varchar(10),
    [Supplier] varchar(10),
    [Metthick] varchar(8),
    [Metwidth] varchar(8),
    [Weight] float,
    [Inturnprodid] varchar(6),
    [Inturnsellen] varchar(10),
    [Metlength] varchar(8),
    [Desttime] datetime,
    [Created_Date] datetime,
    [Operator_Id] varchar(50),
    [Tally] varchar(200),
    [Created_By] varchar(50),
    [IsGradeStamp] varchar(1),
    [IsPaperWrap] varchar(1),
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [RunLineup_Id] int,
    [TallySource] varchar(50),
    [Binnumber] varchar(10),
    [Printed] varchar(1),
    [Booking_Id] varchar(30),
    [Container_Id] varchar(12),
    [BookingProductLineId] int,
    [TagSuffix1] varchar(10),
    [TagSuffix2] varchar(10),
    [OriginalSourceDate] datetime,
    [NonTaggedInventory] varchar(1),
    [ExtraDesc] varchar(40),
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int,
    [PreviousOrderNo] varchar(15),
    [Shippedconsumed_By] varchar(50),
    [Shippedconsumed_Datetime] datetime,
    [OriginalSource] varchar(15),
    [UseHeaderDateForSource] varchar(1),
    [UseHeaderDateForDest] varchar(1)
);



CREATE TABLE [dbo].[Snapshot_Tagdet] (
    [Snapshot_Id] datetime,
    [Seq] int,
    [Tagid] varchar(16),
    [Width] varchar(13),
    [Grade] varchar(12),
    [Cost] float,
    [Market] float,
    [Lin] real,
    [Pcs] real,
    [Fbm] real,
    [Longest] varchar(10),
    [Tally] varchar(200),
    [Species] varchar(10),
    [Thick] varchar(13),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Purcost] float,
    [Othcost] float,
    [Value] float,
    [Sell] float,
    [Trancost] float,
    [Billen] varchar(10),
    [Bundsize] real,
    [Currency] varchar(5),
    [Avgcost] float,
    [Metthick] varchar(10),
    [Metwidth] varchar(10),
    [Lineid] int,
    [Smwid] varchar(25),
    [Date_Created] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int
);



CREATE TABLE [dbo].[Standard_Message] (
    [ID] varchar(12),
    [Seq] int IDENTITY,
    [Msg] varchar(255),
    [Fontsize] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[State_Master] (
    [State_Id] varchar(10),
    [Descrip] varchar(35),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(40),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(40),
    [Active_Status] varchar(1),
    PRIMARY KEY ([State_Id])
);



CREATE TABLE [dbo].[Subscribers] (
    [Subscriber_Id] int,
    [Name] varchar(80),
    [Primary_User_Id] varchar(50),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    [Address] varchar(80),
    [Address2] varchar(80),
    [City] varchar(50),
    [State] varchar(20),
    [PostalCode] varchar(20),
    [Phone] varchar(50),
    [Fax] varchar(50),
    [Website] varchar(80),
    [UserLicenses] int,
    [LicenseExpiry] datetime,
    [LicenseKey] varchar(50),
    [PartnerId] varchar(30),
    [FederalId] varchar(30),
    [Country] varchar(30),
    [LicenseModules] varchar(50),
    [AccountId] varchar(20),
    [PrimaryUser] varchar(50),
    [TallyStationLicenses] int,
    [BilledLicenses] int,
    [HasSubscription] varchar(1),
    [SubscriptionUrl] varchar(100),
    [LastExpiryCheck] datetime,
    [CompanyLogo] varchar(200),
    [TaxIdentificationNo] varchar(9),
    [TransmitterControlCode] varchar(5),
    [ContactName] varchar(40),
    [ContactPhone] varchar(15),
    [ContactEmail] varchar(50),
    [Enable1099Efile] varchar(1),
    PRIMARY KEY ([Subscriber_Id])
);



CREATE TABLE [dbo].[SupLogs] (
    [Tag] varchar(16),
    [Date] datetime,
    [Run] varchar(15),
    [Loads] varchar(20),
    [Permit] varchar(20),
    [BodyWater] varchar(15),
    [Supplier] varchar(10),
    [Car] varchar(15),
    [Species] varchar(10),
    [Grade] varchar(12),
    [Length] float,
    [Diameter] float,
    [Fbm] float,
    [Deduction] float,
    [Description] varchar(50),
    [Status] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Supplier] (
    [ID] varchar(10),
    [Name] varchar(40),
    [Add1] varchar(40),
    [Add2] varchar(40),
    [City] varchar(30),
    [State] varchar(10),
    [Postal] varchar(12),
    [Phone] varchar(20),
    [Fax] varchar(20),
    [Contact] varchar(30),
    [Terms] varchar(10),
    [Currency] varchar(5),
    [Type] varchar(3),
    [Country] varchar(25),
    [Gstno] varchar(16),
    [Eicbno] varchar(20),
    [Def1099Type] varchar(1),
    [Transferorid] varchar(20),
    [Acctid] varchar(25),
    [ModifiedDate] datetime,
    [Inactive] smallint,
    [Email] varchar(300),
    [PartnerId] varchar(20),
    [TagPrefix] varchar(10),
    [TagSuffix] varchar(10),
    [CreateNewTagId] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [MillNumber] varchar(10),
    [KeepPartnerOrderNo] varchar(1),
    [KeepPartnerLotNo] varchar(1),
    [Salesman] varchar(12),
    [Ein_Irs_No] varchar(50),
    [CarrierIdCode] varchar(50)
);



CREATE TABLE [dbo].[SupRates] (
    [GradeId] varchar(12),
    [SpeciesId] varchar(10),
    [Rate] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Sync_DataSource] (
    [DataSource_Name] varchar(30),
    [Server_Name] char(60),
    [DB_Name] varchar(30),
    [User_Id] varchar(50),
    [Password] varchar(60),
    [DataSource_Type] varchar(1),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Active_Status] varchar(1),
    PRIMARY KEY ([DataSource_Name])
);



CREATE TABLE [dbo].[Sync_Job_Status] (
    [Seq] int IDENTITY,
    [Source] varchar(30),
    [Destination] varchar(300),
    [Job_Name] varchar(30),
    [Last_Run_Date] datetime,
    [Last_Record_Date] datetime,
    [Push_Active] varchar(1),
    [Push_Freq] int,
    [Pull_Active] varchar(1),
    [Pull_Freq] int,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Sync_Schedule] (
    [Seq] int IDENTITY,
    [Source] varchar(30),
    [Destination] varchar(300),
    [Activity_Id] varchar(20),
    [Push_Active] varchar(1),
    [Pull_Active] varchar(1),
    [Push_Freq] int,
    [Pull_Freq] int,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Tag] (
    [Tagid] varchar(16),
    [Status] varchar(1),
    [Source] varchar(15),
    [Sourcedate] datetime,
    [Sourceshift] varchar(4),
    [Locid] varchar(10),
    [Grpid] varchar(10),
    [Orderno] varchar(15),
    [Lot] varchar(50),
    [Tallyunit] varchar(1),
    [Volunit] varchar(1),
    [Dest] varchar(15),
    [Destdate] datetime,
    [Destshift] varchar(4),
    [Bundle] real,
    [Pkglen] varchar(10),
    [Pcs] real,
    [Lin] real,
    [Fbm] real,
    [Sellen] varchar(10),
    [Sellenval] real,
    [Pkglenval] real,
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Type] varchar(1),
    [Other] varchar(14),
    [Thick] varchar(13),
    [Width] varchar(13),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Partno] varchar(35),
    [Pcspkg] real,
    [Sellprice] money,
    [Syscode] varchar(3),
    [Ship_Prodid] varchar(8),
    [Lineid] int,
    [Subid] varchar(12),
    [Calcas] varchar(10),
    [Supplier] varchar(10),
    [Metthick] varchar(8),
    [Metwidth] varchar(8),
    [Weight] float,
    [Inturnprodid] varchar(6),
    [Inturnsellen] varchar(10),
    [Metlength] varchar(8),
    [Desttime] datetime,
    [Created_Date] datetime,
    [Operator_Id] varchar(50),
    [Tally] varchar(200),
    [Created_By] varchar(50),
    [IsGradeStamp] varchar(1),
    [IsPaperWrap] varchar(1),
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [RunLineup_Id] int,
    [TallySource] varchar(50),
    [Binnumber] varchar(10),
    [Printed] varchar(1),
    [Booking_Id] varchar(30),
    [Container_Id] varchar(12),
    [BookingProductLineId] int,
    [TagSuffix1] varchar(10),
    [TagSuffix2] varchar(10),
    [OriginalSourceDate] datetime,
    [NonTaggedInventory] varchar(1),
    [ExtraDesc] varchar(40),
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int,
    [PreviousOrderNo] varchar(15),
    [Shippedconsumed_By] varchar(50),
    [Shippedconsumed_Datetime] datetime,
    [OriginalSource] varchar(15),
    [TagCostOrigin] varchar(16),
    [SplitFrom] varchar(16),
    [UseHeaderDateForSource] varchar(1),
    [UseHeaderDateForDest] varchar(1)
);



CREATE TABLE [dbo].[Tag_Archive] (
    [Tagid] varchar(16),
    [Status] varchar(1),
    [Source] varchar(15),
    [Sourcedate] datetime,
    [Sourceshift] varchar(4),
    [Locid] varchar(10),
    [Grpid] varchar(10),
    [Orderno] varchar(15),
    [Lot] varchar(50),
    [Tallyunit] varchar(1),
    [Volunit] varchar(1),
    [Dest] varchar(15),
    [Destdate] datetime,
    [Destshift] varchar(4),
    [Bundle] real,
    [Pkglen] varchar(10),
    [Pcs] real,
    [Lin] real,
    [Fbm] real,
    [Sellen] varchar(10),
    [Sellenval] real,
    [Pkglenval] real,
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Type] varchar(1),
    [Other] varchar(14),
    [Thick] varchar(13),
    [Width] varchar(13),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Partno] varchar(35),
    [Pcspkg] real,
    [Sellprice] money,
    [Syscode] varchar(3),
    [Ship_Prodid] varchar(8),
    [Lineid] int,
    [Subid] varchar(12),
    [Calcas] varchar(10),
    [Supplier] varchar(10),
    [Metthick] varchar(8),
    [Metwidth] varchar(8),
    [Weight] float,
    [Inturnprodid] varchar(6),
    [Inturnsellen] varchar(10),
    [Metlength] varchar(8),
    [Desttime] datetime,
    [Created_Date] datetime,
    [Operator_Id] varchar(50),
    [Tally] varchar(200),
    [Created_By] varchar(50),
    [IsGradeStamp] varchar(1),
    [IsPaperWrap] varchar(1),
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [RunLineup_Id] int,
    [TallySource] varchar(50),
    [Binnumber] varchar(10),
    [Printed] varchar(1),
    [Booking_Id] varchar(30),
    [Container_Id] varchar(12),
    [BookingProductLineId] int,
    [TagSuffix1] varchar(10),
    [TagSuffix2] varchar(10),
    [OriginalSourceDate] datetime,
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int,
    [PreviousOrderNo] varchar(15),
    [Shippedconsumed_By] varchar(50),
    [Shippedconsumed_Datetime] datetime,
    [ExtraDesc] varchar(40),
    [NonTaggedInventory] varchar(1),
    [OriginalSource] varchar(15),
    [UseHeaderDateForSource] varchar(1),
    [UseHeaderDateForDest] varchar(1)
);



CREATE TABLE [dbo].[Tag_Count] (
    [Tagid] varchar(16),
    [Sheet] varchar(10),
    [Location] varchar(10),
    [Countname] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Tagid],[Countname])
);



CREATE TABLE [dbo].[Tag_Exchange] (
    [Date_Stamp] datetime,
    [Tagid] varchar(16),
    [Status] varchar(1),
    [Source] varchar(15),
    [Sourcedate] datetime,
    [Sourceshift] varchar(3),
    [Location] varchar(20),
    [Invgroup] varchar(30),
    [Orderno] varchar(15),
    [Lot] varchar(50),
    [Tallyunit] varchar(1),
    [Bundle] real,
    [Pkglen] varchar(10),
    [Pcs] real,
    [Lin] real,
    [Fbm] real,
    [Sellen] varchar(10),
    [Species] varchar(20),
    [Grade] varchar(20),
    [Milling] varchar(20),
    [State] varchar(20),
    [Lengrp] varchar(20),
    [Type] varchar(1),
    [Other] varchar(10),
    [Thickness] varchar(13),
    [Width] varchar(13),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Partno] varchar(35),
    [Pcspkg] real,
    [Longest] varchar(10),
    [Tally] varchar(200),
    [Counter] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Tag_Master] (
    [Grpid] varchar(10),
    [Prodid] varchar(8),
    [Tagno] varchar(16),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Tag_Order_Hampton] (
    [TagNo] varchar(25),
    [OrderNo] varchar(25)
);



CREATE TABLE [dbo].[Tag_Product] (
    [Invgrp] varchar(10),
    [Subid] varchar(12),
    [Prodid] varchar(8),
    [Tagid] varchar(16),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Tag_Seq] (
    [ID] varchar(12),
    [Nextnum] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Tagcount_Master] (
    [Name] varchar(40),
    [Date] datetime,
    [Invgrps] varchar(255),
    [Yardlocs] varchar(70),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Tagdet] (
    [Seq] int IDENTITY,
    [Tagid] varchar(16),
    [Width] varchar(13),
    [Grade] varchar(12),
    [Cost] float,
    [Market] float,
    [Lin] real,
    [Pcs] real,
    [Fbm] real,
    [Longest] varchar(10),
    [Tally] varchar(200),
    [Species] varchar(10),
    [Thick] varchar(13),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Purcost] float,
    [Othcost] float,
    [Value] float,
    [Sell] float,
    [Trancost] float,
    [Billen] varchar(10),
    [Bundsize] real,
    [Currency] varchar(5),
    [Avgcost] float,
    [Metthick] varchar(10),
    [Metwidth] varchar(10),
    [Lineid] int,
    [Smwid] varchar(25),
    [Date_Created] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Tagdet_Archive] (
    [Seq] int,
    [Tagid] varchar(16),
    [Width] varchar(13),
    [Grade] varchar(12),
    [Cost] float,
    [Market] float,
    [Lin] real,
    [Pcs] real,
    [Fbm] real,
    [Longest] varchar(10),
    [Tally] varchar(200),
    [Species] varchar(10),
    [Thick] varchar(13),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [M3] real,
    [Linm] real,
    [SM] real,
    [Pkgs] real,
    [Prodid] varchar(6),
    [Purcost] float,
    [Othcost] float,
    [Value] float,
    [Sell] float,
    [Trancost] float,
    [Billen] varchar(10),
    [Bundsize] real,
    [Currency] varchar(5),
    [Avgcost] float,
    [Metthick] varchar(10),
    [Metwidth] varchar(10),
    [Lineid] int,
    [Smwid] varchar(25),
    [Date_Created] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Rows] real,
    [AvgWidth] real,
    [AvgLength] real,
    [MasterLineId] int
);



CREATE TABLE [dbo].[Taglist] (
    [Seq] int IDENTITY,
    [Groupid] varchar(14),
    [Tagno] varchar(25),
    [Type] varchar(1),
    [Description] varchar(50),
    [ScannedAt] datetime,
    [Created_Date] datetime,
    [Created_By] varchar(50),
    [TagGroup_Type] varchar(15),
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Task] (
    [ID] int,
    [Assign_To] varchar(50),
    [Subject] varchar(80),
    [Due_Date] datetime,
    [Priority] varchar(2),
    [Status] varchar(2),
    [Related_To] varchar(35),
    [Related_To_Id] varchar(20),
    [Contact_Id] int,
    [Comments] text,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Is_Task] varchar(1),
    [Related_To_Descrip] varchar(80),
    [NotificationSent] varchar(1),
    [ReminderDate] datetime,
    PRIMARY KEY ([ID])
);



CREATE TABLE [dbo].[Taxcode] (
    [ID] varchar(10),
    [Descrip] varchar(25),
    [Rate] real,
    [Additive] int,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Ten99_Invoice] (
    [Voucher] int,
    [Type] varchar(5),
    [Amount] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Ten99_Type] (
    [Type] varchar(5),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [IrsformName] varchar(10)
);



CREATE TABLE [dbo].[Terminal] (
    [Terminal_Id] varchar(10),
    [Terminal_Name] varchar(40),
    [Terminal_Add1] varchar(40),
    [Terminal_Add2] varchar(40),
    [Terminal_Add3] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [Terminal_Email] varchar(100),
    [City] varchar(30),
    [State] varchar(15),
    [Country] varchar(25),
    [Zipcode] varchar(14),
    [Phone] varchar(25)
);



CREATE TABLE [dbo].[Terms] (
    [ID] varchar(10),
    [Descrip] varchar(50),
    [Days] int,
    [Dayofmon] int,
    [Percent] float,
    [Inactive] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [DueDateCalcMethod] varchar(1),
    [DiscDateCalcMethod] varchar(1),
    [DiscDays] int,
    [DiscDayOfMonth] int
);



CREATE TABLE [dbo].[Tier] (
    [Seq] int IDENTITY,
    [Thick] varchar(13),
    [Width] varchar(13),
    [Lengrp] varchar(10),
    [Fbm] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[TimberTracker] (
    [Seq] int IDENTITY,
    [RunId] varchar(15),
    [GradeMark] varchar(50),
    [Thick] varchar(16),
    [Width] varchar(16),
    [PcsTally] varchar(200),
    [VolumeRequired] real,
    [TotalPcs] real,
    [Hide] varchar(1),
    [VolumeLengths] varchar(200),
    [ScanThickMin] real,
    [ScanThickMax] real,
    [ScanWidthMin] real,
    [ScanWidthMax] real,
    [RandomWidths] varchar(200),
    [AvgSalesValue] money,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[TimberTrackerMinimum] (
    [Seq] int IDENTITY,
    [RunId] varchar(15),
    [GradeMark] varchar(50),
    [Thick] varchar(16),
    [Width] varchar(16),
    [Length] varchar(10),
    [MinQty] real,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[TimberTrackerProduction] (
    [Seq] int IDENTITY,
    [RunId] varchar(15),
    [GradeMark] varchar(50),
    [Thick] varchar(16),
    [Width] varchar(16),
    [Length] varchar(10),
    [Pcs] real,
    [Status] varchar(1),
    [BF] real,
    [ProducedDate] datetime,
    [RandomWidth] varchar(16),
    [ShiftId] varchar(2),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[TouchScreen_LastProduct] (
    [User_Id] varchar(50),
    [Run_Id] varchar(15),
    [Product_Id] varchar(32),
    [Paper_Wrap] varchar(1),
    [Grade_Stamp] varchar(1),
    [Tag_Type] varchar(1),
    [Part_No] varchar(30)
);



CREATE TABLE [dbo].[Trad_Adj] (
    [Seq] int IDENTITY,
    [Invoiceid] varchar(10),
    [Salesmanid] varchar(12),
    [Tradertype] varchar(1),
    [Date] datetime,
    [Reason] varchar(100),
    [Adjustment] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Trad_Buyer_Com] (
    [Invoiceid] varchar(10),
    [Linenum] varchar(8),
    [Buyernum] varchar(1),
    [Buyer] varchar(8),
    [Buyercom] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Trad_Com_Hdr] (
    [Invoiceid] varchar(10),
    [Linenum] varchar(8),
    [Numbuyers] smallint,
    [Seller] varchar(8),
    [Sellercom] real,
    [Calctype] varchar(1),
    [Lumbercost] real,
    [Misccharges] real,
    [Totalcom] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Trad_Misc_Charges] (
    [Invoiceid] varchar(10),
    [Linenum] varchar(8),
    [Seq] varchar(4),
    [Date] datetime,
    [Supplier] varchar(10),
    [Type] varchar(10),
    [Qty] float,
    [Unit] varchar(6),
    [Price] float,
    [Amount] float,
    [Funds] varchar(3),
    [Descrip] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Transfer_Det] (
    [Tranid] varchar(10),
    [Tagid] varchar(12),
    [Pinvgrp] varchar(10),
    [Pyardloc] varchar(10),
    [Costm] money,
    [Datefrom] datetime,
    [Dateto] datetime,
    [Date] datetime,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Transfer_Hdr] (
    [ID] varchar(10),
    [Shipvia] varchar(40),
    [Ship1] varchar(50),
    [Ship2] varchar(50),
    [Ship3] varchar(50),
    [Ship4] varchar(50),
    [Yardloc] varchar(10),
    [Invgrp] varchar(10),
    [Date] datetime,
    [Descrip] varchar(50),
    [Costm] money,
    [Note1] varchar(40),
    [Note2] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Truck_Det] (
    [Ordnum] varchar(20),
    [Seq] varchar(3),
    [Droppick] varchar(20),
    [Millcust] varchar(50),
    [Ourorder] varchar(40),
    [Millcustnum] varchar(40),
    [Proddesc] varchar(70),
    [Qty] float,
    [Date] datetime,
    [Millcode] varchar(10),
    [Shipto] varchar(55),
    [Shipadd1] varchar(55),
    [Shipadd2] varchar(55),
    [Shipadd3] varchar(55),
    [Shipadd4] varchar(55),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Truck_Hdr] (
    [Ordnum] varchar(20),
    [Date] datetime,
    [Truckid] varchar(10),
    [Contact] varchar(40),
    [Customid] varchar(10),
    [Fundsid] varchar(10),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [User6] varchar(50),
    [User7] varchar(50),
    [User8] varchar(50),
    [User9] varchar(50),
    [User10] varchar(50),
    [Notes] varchar(255),
    [Footer] varchar(20),
    [Shipvia] varchar(1),
    [Status] varchar(1),
    [Distance] float,
    [Freight] float,
    [Type] varchar(1),
    [Tempdesc] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Trucker] (
    [ID] varchar(10),
    [Name] varchar(40),
    [Address] varchar(40),
    [City] varchar(30),
    [Zipcode] varchar(12),
    [Phone] varchar(20),
    [Contact] varchar(30),
    [User1] varchar(50),
    [User2] varchar(50),
    [User3] varchar(50),
    [User4] varchar(50),
    [User5] varchar(50),
    [Fax] varchar(20),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Uli_Master] (
    [Ulinum] varchar(3),
    [CompName] varchar(50),
    [InvGrp] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Units] (
    [ID] varchar(6),
    [Descrip] varchar(20),
    [Qtytext] varchar(10),
    [Pricetext] varchar(10),
    [Divisor] float,
    [Decimals] smallint,
    [Calcas] varchar(3),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Uptime] (
    [Date] datetime,
    [Machineid] varchar(10),
    [Shift] varchar(4),
    [Line] varchar(1),
    [Uptime_Est] real,
    [Uptime_Avail] real,
    [Uptime_Actual] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Uscust_Det] (
    [Ship_Ref] varchar(20),
    [Line_No] varchar(2),
    [Description] varchar(200),
    [Unit] varchar(6),
    [Unit_Qty] float,
    [Unit_Price] float,
    [Inv_Total] float,
    [Inv_Pkgs] int,
    [Inv_Pcs] int,
    [Htscode] varchar(50),
    [DutyIncluded] smallint,
    [Exch_Rate] real,
    [Cdn_Amt] money,
    [Frt] money,
    [Disc] money,
    [Duty] money,
    [Brok] money,
    [Net_Amount] money,
    [Duty_Owing] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Uscust_Hdr] (
    [Shipper] varchar(50),
    [Ship_Add1] varchar(40),
    [Ship_Add2] varchar(40),
    [Ship_Zip] varchar(15),
    [Broker] varchar(50),
    [Broker_Add1] varchar(40),
    [Broker_Add2] varchar(40),
    [Broker_Add3] varchar(40),
    [Ship_Ref] varchar(20),
    [Invoice_No] varchar(20),
    [Page] varchar(30),
    [Consignee] varchar(50),
    [Cons_Add1] varchar(40),
    [Cons_Add2] varchar(40),
    [Cons_Zip] varchar(55),
    [Cust_Hand1] varchar(40),
    [Cust_Hand2] varchar(40),
    [Cust_Hand3] varchar(40),
    [Cust_Hand4] varchar(40),
    [Buyer] varchar(50),
    [Buyer_Add1] varchar(40),
    [Buyer_Add2] varchar(40),
    [Buyer_Zip] varchar(60),
    [Origin] varchar(40),
    [Destination] varchar(40),
    [Terms1] varchar(35),
    [Terms2] varchar(35),
    [Terms3] varchar(35),
    [Terms4] varchar(35),
    [Pre_Carriage] varchar(40),
    [Export_Carriage] varchar(40),
    [Port_Of_Entry] varchar(40),
    [Inv_Date] datetime,
    [Sale_Date] datetime,
    [Exch_Rate] float,
    [Currency] varchar(20),
    [Route] varchar(50),
    [Buyer_Ref] varchar(40),
    [Mark1] varchar(20),
    [Mark2] varchar(20),
    [Mark3] varchar(20),
    [Package1] varchar(45),
    [Package2] varchar(45),
    [Package3] varchar(45),
    [Gross_Wght1] varchar(35),
    [Gross_Wght2] varchar(35),
    [Gross_Wght3] varchar(35),
    [Export_Reason] varchar(50),
    [Export_Permit] varchar(20),
    [Est_Frght_Charges] varchar(50),
    [Trans_Mode] varchar(20),
    [Sign_Date] datetime,
    [Status] varchar(20),
    [Packaging] float,
    [Ocean_Frght] float,
    [Dom_Frght] float,
    [Insurance] float,
    [Misc_Trans] float,
    [Commission] float,
    [Container] float,
    [Assists] float,
    [Invoice_Total] float,
    [Type] varchar(1),
    [Tempdesc] varchar(40),
    [Primmill] float,
    [Eta] varchar(20),
    [Totpkgs] float,
    [DutyPerc] float,
    [Revuser] varchar(10),
    [Revdate] datetime,
    [RevNumber] int,
    [User1] varchar(255),
    [User2] varchar(255),
    [IsCvdcombo] int,
    [Shipper_Id] varchar(10),
    [Consignee_Id] varchar(10),
    [Buyer_Id] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    [PpqarrivalDate] datetime,
    [PpqentryNumber] varchar(25),
    [PpqmanufacturerId] varchar(50),
    [PpqbillOfLading] varchar(15),
    [PpqcontainerNo] varchar(50),
    [Broker_Id] varchar(10)
);



CREATE TABLE [dbo].[Uscust_Hdr_Duty] (
    [Seq] int IDENTITY,
    [Ship_Ref] varchar(20),
    [Code] varchar(20),
    [Amt] varchar(50),
    [Currency] varchar(20),
    [ExchRate] real,
    [Cdn_Amt] real,
    [Included] smallint,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Uscust_Lacey] (
    [Ship_Ref] varchar(20),
    [Htsnumber] varchar(50),
    [MerchandiseDescrip] varchar(50),
    [EnteredValue] money,
    [Species] varchar(50),
    [ScientificName] varchar(100),
    [CountryOfHarvest] varchar(50),
    [Qty] float,
    [Uom] varchar(6),
    [RecycledPercent] real,
    PRIMARY KEY ([Ship_Ref],[Htsnumber],[Species])
);



CREATE TABLE [dbo].[Uscust_Mill] (
    [Ship_Ref] varchar(20),
    [Seq] varchar(3),
    [Name] varchar(50),
    [Gst] varchar(50),
    [Volume] varchar(50),
    [Species] varchar(50),
    [Product] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[User_Options] (
    [Option_Id] varchar(80),
    [Value] varchar(250),
    [User_Id] varchar(50),
    [Seq] int IDENTITY,
    [Option_Seq] int,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    [Facility_Id] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[User_Query_Search] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [Query_Name] varchar(40),
    [Search_Name] varchar(60),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[User_Query_View] (
    [Seq] int IDENTITY,
    [User_Id] varchar(50),
    [Query_Name] varchar(40),
    [View_Name] varchar(40),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[User_Report] (
    [Userid] varchar(50),
    [Name] varchar(50),
    [Type] varchar(6),
    [Engine] varchar(12),
    [Enginereport] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Usercombo] (
    [Groupid] varchar(10),
    [Field] varchar(5),
    [Descrip] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[UserLogins] (
    [Seq] int IDENTITY,
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [ActionName] varchar(40),
    [LoginDate] datetime,
    [LogoutDate] datetime,
    [ApplicationName] varchar(10),
    [ApplicationVersion] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq],[Subscriber_Id])
);



CREATE TABLE [dbo].[UserPasswordChanges] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [NewPassword] varchar(40),
    [DateChanged] datetime,
    [Seq] int IDENTITY,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[Seq])
);



CREATE TABLE [dbo].[UserReports] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Report_Id] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id],[Report_Id])
);



CREATE TABLE [dbo].[Users] (
    [Subscriber_Id] int,
    [ID] varchar(50),
    [UserName] varchar(50),
    [FirstName] varchar(30),
    [LastName] varchar(30),
    [FullName] varchar(60),
    [Password] varchar(40),
    [LastSuccessfulLogin] datetime,
    [Profile_Id] varchar(10),
    [ForceChangePassword] varchar(1),
    [EmailAddress] varchar(100),
    [PasswordRequestId] varchar(10),
    [PasswordLastChanged] datetime,
    [PasswordNeverExpires] varchar(1),
    [InvalidLoginCount] int,
    [UserAlias] varchar(10),
    [Title] varchar(40),
    [Company] varchar(40),
    [Department] varchar(20),
    [MailingAddress1] varchar(50),
    [MailingAddress2] varchar(50),
    [MailingCity] varchar(20),
    [MailingState] varchar(10),
    [MailingCountry] varchar(20),
    [MailingPostal] varchar(20),
    [TimeZone] varchar(10),
    [PreferredLanguage] varchar(10),
    [Phone] varchar(20),
    [Fax] varchar(20),
    [Mobile] varchar(20),
    [EmployeeId] varchar(10),
    [StartOfDay] datetime,
    [EndOfDay] datetime,
    [Supervisor] varchar(50),
    [LastChanged] datetime,
    [LastChangedBy] varchar(50),
    [CreatedDate] datetime,
    [CreatedBy] varchar(50),
    [IsNew] varchar(1),
    [IsRevised] varchar(1),
    [IsActive] varchar(1),
    [Pin_No] varchar(8),
    [IsSystemAdmin] varchar(1),
    [UserId] varchar(50),
    [IsTallyStationUser] varchar(1),
    [Salt] varchar(36),
    [Hash] varchar(64),
    PRIMARY KEY ([Subscriber_Id],[ID])
);



CREATE TABLE [dbo].[UserSession] (
    [UserName] varchar(50),
    [SessionId] varchar(50),
    [LastChanged] datetime,
    PRIMARY KEY ([UserName])
);



CREATE TABLE [dbo].[UserViews] (
    [Subscriber_Id] int,
    [User_Id] varchar(50),
    [Object_Id] varchar(60),
    [ViewName] varchar(60),
    [Xmldata] text,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Subscriber_Id],[User_Id],[Object_Id],[ViewName])
);



CREATE TABLE [dbo].[Warf_Det] (
    [Ship_Ref] varchar(10),
    [Seq] varchar(2),
    [Length] float,
    [Package] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Warf_Hdr] (
    [Ship_Ref] varchar(20),
    [Terminal] varchar(40),
    [Terminal_Add1] varchar(40),
    [Terminal_Add2] varchar(40),
    [Terminal_Add3] varchar(40),
    [Shipper] varchar(50),
    [Ship_Add1] varchar(40),
    [Ship_Add2] varchar(40),
    [Ship_Zip] varchar(40),
    [Order_Num] varchar(30),
    [Voyage] varchar(30),
    [Truck_Co] varchar(30),
    [License] varchar(30),
    [Vessel] varchar(50),
    [Port] varchar(50),
    [Driver] varchar(30),
    [Mill] varchar(30),
    [Dipped] smallint,
    [Kiln_Dried] smallint,
    [Special_Ins] varchar(50),
    [Pkg_Height] varchar(20),
    [Mill_Shipper] varchar(30),
    [Mark] varchar(30),
    [Total_Pgs] varchar(30),
    [Fbm] varchar(20),
    [Bin_Number] varchar(30),
    [Dunnage] smallint,
    [Complete] varchar(5),
    [Comm1] varchar(50),
    [Comm2] varchar(50),
    [Comm3] varchar(50),
    [Comm4] varchar(50),
    [Date_Rec] datetime,
    [Checker] varchar(30),
    [Office] varchar(30),
    [Tempdesc] varchar(50),
    [Type] varchar(5),
    [Units] varchar(10),
    [Species] varchar(40),
    [Bookno] varchar(20),
    [Chk_Fsd] smallint,
    [Opt_Pack] smallint,
    [Opt_Stowage] smallint,
    [Opt_Prestick] smallint,
    [M3] varchar(20),
    [Size] varchar(50),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[Weight] (
    [Seq] int IDENTITY,
    [Species] varchar(10),
    [State] varchar(10),
    [Weight] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Wendt] (
    [Seq] int IDENTITY,
    [Thickness] varchar(13),
    [Width] varchar(13),
    [Length] varchar(10),
    [Factor] float,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[Wendt_Part] (
    [Seq] int IDENTITY,
    [Custid] varchar(10),
    [Partno] varchar(35),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Length] varchar(10),
    [Factor] float,
    [Price] money,
    [Oldprice] money,
    [Groupid] varchar(10),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[WO_Det] (
    [ID] varchar(10),
    [Seq] smallint,
    [Type] varchar(1),
    [Categ] smallint,
    [Descrip] varchar(70),
    [Thick] varchar(13),
    [Width] varchar(13),
    [Species] varchar(10),
    [Grade] varchar(12),
    [Milling] varchar(10),
    [State] varchar(10),
    [Lengrp] varchar(10),
    [Extradesc] varchar(30),
    [Prodid] varchar(10),
    [Sell] money,
    [Costunit] varchar(2),
    [Estbf] real,
    [Estcost] money,
    [Estexten] money,
    [Actdate] varchar(50),
    [Actbf] real,
    [Actcost] money,
    [Actext] money,
    [Openbf] real,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[WO_Detail] (
    [Seq] int IDENTITY,
    [WO_Id] varchar(15),
    [Type] varchar(1),
    [Product_Id] varchar(32),
    [Descrip] varchar(160),
    [Qty] float,
    [Uom] varchar(8),
    [Cost] real,
    [Cost_Amount] money,
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1),
    PRIMARY KEY ([Seq])
);



CREATE TABLE [dbo].[WO_Hdr] (
    [ID] varchar(10),
    [Date] datetime,
    [Location] varchar(10),
    [Division] varchar(10),
    [Status] varchar(3),
    [Closedate] datetime,
    [Theirord] varchar(20),
    [Descrip] varchar(50),
    [Comment1] varchar(80),
    [Comment2] varchar(80),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed_By] varchar(50),
    [Last_Changed] datetime,
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Active_Status] varchar(1)
);



CREATE TABLE [dbo].[WO_Header] (
    [WO_Id] varchar(15),
    [Date_Placed] datetime,
    [From_Location] varchar(10),
    [TO_Location] varchar(10),
    [Status] varchar(1),
    [Comment] varchar(50),
    [Cust_Name] varchar(50),
    [Cust_Po] varchar(15),
    [Order_Id] varchar(15),
    [Master_Wo_Id] varchar(15),
    [Bom_Id] varchar(32),
    [Qty] real,
    [Due_Date] datetime,
    [Delivery_Date] datetime,
    [Entry_No] int,
    [Customer_Id] varchar(15),
    [Warehouse_Id] varchar(10),
    [Is_New] varchar(1),
    [Is_Revised] varchar(1),
    [Created_By] varchar(50),
    [Created_Date] datetime,
    [Last_Changed] datetime,
    [Last_Changed_By] varchar(50),
    PRIMARY KEY ([WO_Id])
);

