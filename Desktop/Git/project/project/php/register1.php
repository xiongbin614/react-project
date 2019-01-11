<?php
	header("Content-Type:text/html;charset=utf-8");
	$psw= $_GET["psw"];
	$phone=$_GET["phone"];

//	echo $phone;
//	echo $psw;
	$conn = mysqli_connect("localhost","root","xb960614","xb");
	mysqli_query($conn,"set names utf8");
	$sql = "select * from logins";
	 $sqlSave="insert into logins(phone,psw) values ('$phone','$psw')";
	$result = mysqli_query($conn,$sql);
	
	$flag = false;
	while($arr = mysqli_fetch_array($result)){
		if($phone == $arr["phone"]){
			$flag=true;
			break;
		}
	}
	if($flag){
//			注册失败哦
			echo 0;
		
	}else{
		mysqli_query($conn,$sqlSave);
//		注册成功
		echo 1;
	}
	
	
?>