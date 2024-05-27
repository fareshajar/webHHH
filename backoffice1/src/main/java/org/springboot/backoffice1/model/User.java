package org.springboot.backoffice1.model;


public class User {

    private int UserId;


    private String UserName;

    private String PassWord;

   private int nombreservice;
    private int UserType;
    private String avis;
    private String email;

    private String mobile;

    private String adress;

    private String ville;
    private String  categorie;

    public String getCategorie() {
        return categorie;
    }
    private int demandes_en_attente;

    public int getDemandenattente() {
        return demandes_en_attente;
    }

    public String getAvis() {
        return avis;
    }

    public void setAvis(String avis) {
        this.avis = avis;
    }

    public int getNombreservice() {
        return nombreservice;
    }

    public void setNombreservice(int nombreservice) {
        this.nombreservice = nombreservice;
    }

    public void setDemandenattente(int demandenattente) {
        this.demandes_en_attente = demandenattente;
    }
   private int demandes_terminees;
    private int totalDemandes;

    public int getTotalDemandes() {
        return totalDemandes;
    }

    public void setTotalDemandes(int totalDemandes) {
        this.totalDemandes = totalDemandes;
    }

    public int getDemandetermine() {
        return demandes_terminees;
    }

    public void setDemandetermine(int demandetermine) {
        this.demandes_terminees= demandetermine;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) {
        UserId = userId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getPassWord() {
        return PassWord;
    }

    public void setPassWord(String passWord) {
        PassWord = passWord;
    }

    public int getUserType() {
        return UserType;
    }

    public void setUserType(int userType) {
        UserType = userType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public User(String userName, String passWord, int userType, String email, String mobile, String adress, String ville) {
        UserName = userName;
        PassWord = passWord;
        UserType = userType;
        this.email = email;
        this.mobile = mobile;
        this.adress = adress;
        this.ville = ville;
    }

    public User(String userName, String passWord, int userType, String mobile, String ville) {
        UserName = userName;
        PassWord = passWord;
        UserType = userType;
        this.mobile = mobile;
        this.ville = ville;
    }

    public User() {
    }
}
