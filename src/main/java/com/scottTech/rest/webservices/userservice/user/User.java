package com.scottTech.rest.webservices.userservice.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@ApiModel(description = "Something Useful about the user class")
@Entity
public class User {
    @Id
    @GeneratedValue
    private Integer id;

    @ApiModelProperty(notes = "Name should have at least 2 characters")
    @Size(min = 2, message = "Name should have at least 2 characters.")
    private String username;

    @JsonIgnore
    private String password;

    private int active;

    @JsonIgnore
    private String roles = "";
    @JsonIgnore
    private String permissions = "";


    @Past
    @ApiModelProperty(notes = "Birthday should be in the past")
    private Date birthDate;


    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    public User() {
    }


    public User(Integer id, String username, String password, Date birthDate, String roles, String permissions) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.birthDate = birthDate;
        this.roles = roles;
        this.permissions = permissions;
        this.active = 1;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return username;
    }

    public void setName(String username) {
        this.username = username;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public String getPassword() {
        return password;
    }

    public int getActive() {
        return active;
    }

    public String getRoles() {
        return roles;
    }

    public String getPermissions() {
        return permissions;
    }


    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public List<String> getPermissionList() {
        if (this.permissions.length() > 0) {
            return Arrays.asList(this.permissions.split(","));
        }
        return new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", birthDate=" + birthDate +
                '}';
    }
}
