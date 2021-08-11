package com.higradius;

public class Invoice {

	private String custName;
    private String custID; 
    private Long docID;
    private Double invoiceAmount;
    private String dueDate;
    private String docCreateDate;
    private String notes;
    
	
	public Invoice() {
		custName = null;
	    custID = null; 
	    docID = null;
	    invoiceAmount = null;
	    dueDate = null;
	    docCreateDate = null;
	    notes = null;
	}
	
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getCustID() {
		return custID;
	}
	public void setCustID(String custID) {
		this.custID = custID;
	}
	public Long getDocID() {
		return docID;
	}
	public void setDocID(Long docID) {
		this.docID = docID;
	}
	public Double getInvoiceAmount() {
		return invoiceAmount;
	}
	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getDocCreateDate() {
		return docCreateDate;
	}

	public void setDocCreateDate(String docCreateDate) {
		this.docCreateDate = docCreateDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
    
    
}
