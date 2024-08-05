package com.ikbal.blogServer.dto;

//a request dto that transfers new password
public class ChangeRequest {
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}
