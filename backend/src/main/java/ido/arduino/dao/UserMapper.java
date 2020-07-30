package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.UserDTO;

@Mapper
public interface UserMapper {
	int insert(UserDTO user);
	int update(UserDTO user);
	int delete(int userID);
	UserDTO findBySocialID(String socialID);
	UserDTO findByUserID(int userID);
	List<UserDTO> searchUsersByName(String name);
}
