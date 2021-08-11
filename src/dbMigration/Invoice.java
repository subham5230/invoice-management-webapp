package dbMigration;

public class Invoice{
	//Initialising private data members
	private String business_code = null;
	private String cust_number = null;
	private String name_customer = null;
	private java.sql.Date clear_date = null;
	private Integer business_year = null;
	private Long doc_id = null;
	private java.sql.Date posting_date = null;
	private java.sql.Date document_create_date = null;
	private java.sql.Date due_in_date = null;
	private String invoice_currency = null;
	private String document_type = null;
	private Short posting_id = null;
	private String area_business = null;
	private Double total_open_amount = null;
	private java.sql.Date baseline_create_date = null;
	private String cust_payment_terms = null;
	private Long invoice_id = null;
	private Short isOpen = null;

	public java.sql.Date getBaseline_create_date() {
		return baseline_create_date;
	}

	public void setBaseline_create_date(java.sql.Date baseline_create_date) {
		this.baseline_create_date = baseline_create_date;
	}

	
	public java.sql.Date getClear_date() {
		return clear_date;
	}

	public void setClear_date(java.sql.Date clear_date) {
		this.clear_date = clear_date;
	}

	public java.sql.Date getPosting_date() {
		return posting_date;
	}

	public void setPosting_date(java.sql.Date posting_date) {
		this.posting_date = posting_date;
	}

	public java.sql.Date getDocument_create_date() {
		return document_create_date;
	}

	public void setDocument_create_date(java.sql.Date document_create_date) {
		this.document_create_date = document_create_date;
	}

	public java.sql.Date getDue_in_date() {
		return due_in_date;
	}

	public void setDue_in_date(java.sql.Date due_in_date) {
		this.due_in_date = due_in_date;
	}

	public String getBusiness_code() {
		return business_code;
	}

	public void setBusiness_code(String business_code) {
		this.business_code = business_code;
	}

	public String getCust_number() {
		return cust_number;
	}

	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}

	public String getName_customer() {
		return name_customer;
	}

	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	
	public Integer getBusiness_year() {
		return business_year;
	}
	
	public void setBusiness_year(Integer business_year) {
		this.business_year = business_year;
	}
	
	public Long getDoc_id() {
		return doc_id;
	}
	
	public void setDoc_id(Long doc_id) {
		this.doc_id = doc_id;
	}
	
	public String getInvoice_currency() {
		return invoice_currency;
	}
	
	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}
	
	public String getDocument_type() {
		return document_type;
	}
	
	public void setDocument_type(String document_type) {
		this.document_type = document_type;
	}
	
	public Short getPosting_id() {
		return posting_id;
	}

	public void setPosting_id(Short posting_id) {
		this.posting_id = posting_id;
	}
	
	public String getArea_business() {
		return area_business;
	}
	
	public void setArea_business(String area_business) {
		this.area_business = area_business;
	}
	
	public Double getTotal_open_amount() {
		return total_open_amount;
	}
	
	public void setTotal_open_amount(Double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	
	public String getCust_payment_terms() {
		return cust_payment_terms;
	}
	
	public void setCust_payment_terms(String cust_payment_terms) {
		this.cust_payment_terms = cust_payment_terms;
	}
	
	public Long getInvoice_id() {
		return invoice_id;
	}
	
	public void setInvoice_id(Long invoice_id) {
		this.invoice_id = invoice_id;
	}
	
	public Short getIsOpen() {
		return isOpen;
	}
	
	public void setIsOpen(Short isOpen) {
		this.isOpen = isOpen;
	}
	
}
