<?php
	header("Content-Type:text/html;charset=utf-8");
	$psw= $_GET["psw"];
	$phone=$_GET["phone"];

//	echo $phone;
//	echo $psw;
	$conn = mysqli_connect("localhost","root","xb960614","xb");
	mysqli_query($conn,"set names utf8");
	$sql = "select * from logins";
	$result = mysqli_query($conn,$sql);
	
	$flag = false;
	while($arr = mysqli_fetch_array($result)){
		if($phone == $arr["phone"]){
			if($psw == $arr["psw"]){
				//登录成功
				echo 1;//用户名和密码都对
			}else{
				echo 0;//密码有误
			}
			$flag = true;//表示用户名存在
		}
	}
	if(!$flag){
		echo 2;//表示用户名不存在。
	}
	
	
?>