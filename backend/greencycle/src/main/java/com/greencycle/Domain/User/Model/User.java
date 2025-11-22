package com.greencycle.Domain.User.Model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 50)
	private String username;

	@Column(nullable = false, length = 100)
	private String email;

	@JsonIgnore
	@Column(nullable = false)
	private String password;

	// Constructors

	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	@Column(nullable = false)
	private Integer ecoPoints = 0;

	@Column(name = "role", nullable = false, length = 50)
	private String role = "USER"; // default role

	@Column(nullable = false)
	private Integer tillNowEcoPoints = 0;

	// 🟢 Getter and Setter

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getTillNowEcoPoints() {
		return tillNowEcoPoints;
	}

	public void setTillNowEcoPoints(Integer tillNowEcoPoints) {
		this.tillNowEcoPoints = tillNowEcoPoints;
	}

	public Integer getEcoPoints() {
		return ecoPoints;
	}

	public void setEcoPoints(Integer ecoPoints) {
		this.ecoPoints = ecoPoints;
	}

	// Getters & Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}