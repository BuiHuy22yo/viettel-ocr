export default {
  common: {
    status: {
      created: 'Created',
      submittedRfq: 'Submitted RFQ',
    },
  },
  allRFQTab: {
    title: 'All',
    panelSearch: {
      rfqId: 'RFQ ID',
      rfqName: 'RFQ name',
      serviceRequestId: 'Service request ID',
      createdBy: 'Created by',
      createdDate: 'Created date',
      status: 'Status',
    },
    table: {
      columns: {
        rfqId: 'RFQ ID',
        rfqName: 'RFQ name',
        deadline: 'Deadline',
        status: 'Status',
        action: 'Actions',
      },
      action: {
        view: 'View Details',
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    drawer: {
      quoteDetail: {
        title: 'RFQ detail',
        panelInformation: {
          partnerId: 'Partner ID',
          partnerName: 'Partner name',
          reporter: 'Reporter',
          deadline: 'Deadline',
          issueDate: 'Issue date',
          estimatedDeliveryDate: 'Estimated delivery date',
          totalAmount: 'Total Amount',
          partnerEvaluation: 'Partner evaluation',
        },
        serviceRFQList: {
          title: 'Service RFQ',
          columns: {
            serviceProduct: 'Service/Product',
            serviceProductType: 'Service/Product type',
            variantCode: 'Variant code',
            variantName: 'Variant name',
            manufacturer: 'Manufacturer',
            tradeCode: 'Trade code',
            quantityRequested: 'Quantity requested',
            unit: 'Unit',
            quantitySupply: 'Quantity supply',
            price: 'Price',
            amount: 'Amount',
            note: 'Note',
          },
        },
      },
      button: {
        submitRequest: 'Submit Quote',
        createContract: 'Create contract',
      },
    },
  },
  submittedRFQTab: {
    title: 'Submitted',
  },
  notYetSubmittedRFQTab: {
    title: 'Pending',
  },
};
