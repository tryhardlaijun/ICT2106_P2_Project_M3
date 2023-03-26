import React, { useState ,useEffect} from "react";
import { useNavigate , useLocation } from "react-router-dom";
import {
    Text,
	Box,
	Button,
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const FormCard = ({ ruleInfo, updateForm, updateOption, stateInfo }) => {
	const name = stateInfo? "Update API Rule": " Update API Rule";
    let originalDevice = ruleInfo.deviceId
    function returnDeviceName(deviceID){
		if(deviceID == "33333333-3333-3333-3333-333333333333"){
			return "FAN Room 1"
		}
	}
	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
				{name}
			</Heading>
            <Input
				variant="unstyled"
				textAlign="center"
				fontWeight="normal"
				fontSize="3xl"
				pb="1%"
				placeholder="ENTER NAME"
				size="lg"
				value={ruleInfo.ruleName}
				onChange={(e) => {
					updateForm({ ruleName: e.target.value });
				}}
			/>
            <Text fontSize="2xl">
				{"Scenario Name: " +
					localStorage.getItem("currentScenarioName")}
			</Text>
			{/* <Input variant="unstyled" placeholder="ENTER NAME" size="lg"
            value={ruleInfo.RuleName}
            onChange={(e) => {
                updateForm({ RuleName: e.target.value });
            }} /> */}
			<Flex mt="2%">
				<FormControl mr="5%">
					<FormLabel>Device</FormLabel>
					<Select placeholder="Select option" value={stateInfo?stateInfo.deviceId:null}
                    onChange={(e)=>{
						updateForm({deviceId: e.target.value})
					}}>
                    <option value={originalDevice}>{returnDeviceName(originalDevice)}</option>
					</Select>
				</FormControl>
			</Flex>
            <Flex mt="2%">
				<FormControl mr="5%">
					<FormLabel>API Key</FormLabel>
					<Select placeholder="Select option" value={stateInfo?stateInfo.apiKey:null}
                    onChange={(e)=>{
						updateForm({apiKey: e.target.value})
					}}>
						<option value="option1">API 1</option>
						<option value="option2">API 2</option>
						<option value="option3">API 3</option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>API Value</FormLabel>
					<Select placeholder="Select option" value={stateInfo?stateInfo.apiValue:null}
                    onChange={(e)=>{
						updateForm({apiValue: e.target.value})
					}}>
						<option value="option1">Value 1</option>
						<option value="option2">Value 2</option>
						<option value="option3">Value 3</option>
					</Select>
				</FormControl>
			</Flex>
            <Flex mt="2%">
				<FormControl mr="5%">
					<FormLabel>Action</FormLabel>
					<Select placeholder="Select option" value={stateInfo?stateInfo.configurationKey:null}
					onChange={(e)=>{
						updateForm({configurationKey: e.target.value})
					}}>
						<option value="speed">Speed</option>
						<option value="oscillation">Oscillation</option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Value</FormLabel>
					<Select placeholder="Select option" value={stateInfo?stateInfo.configurationValue:null}
					onChange={(e)=>{
						updateForm({configurationValue: parseInt(e.target.value)})
					}}>	
						{updateOption(ruleInfo)}						
					</Select>
				</FormControl>
			</Flex>
		</>
	);
};

export default function ApiRule() {
	const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [newFlag, setNewFlag] = useState(false);
    const [ruleDetail, setRuleDetail] = useState({
		ruleId: uuidv4(),
		scenarioId: localStorage.getItem("currentScenarioId"),
		configurationKey: null,
		configurationValue: null,
		actionTrigger: null,
		RuleName: "",
		startTime: null,
		endTime: null,
		deviceId: "33333333-3333-3333-3333-333333333333",
		apiKey: "",
		apiValue: "",
	});

    function updateDetails(value) {
		return setRuleDetail((prev) => {
			return { ...prev, ...value };
		});
	}

	function renderOptions(ruleDetail){
		if(ruleDetail.configurationKey=="speed"){
			return(
				<>
				<option value={0}>1</option>
				<option value={1}>2</option>
				<option value={2}>3</option>
				<option value={3}>4</option>
				<option value={4}>5</option>
				</>
			);
		}else if(ruleDetail.configurationKey=="oscillation"){
			return(
				<>
				<option value={0}>Turn On</option>
				<option value={1}>Turn Off</option>
				</>
			);
		}
		return null;
	}
    

    useEffect(() => {
		if (location.state) {
			let ruleinfo = location.state;
			console.log(ruleinfo);
			setRuleDetail(ruleinfo);
		} else {
			setNewFlag(true);
		}
	}, [location.state]);

    async function createRule(e){
		const newRule = { ...ruleDetail };
		const url = newFlag
			? "https://localhost:7140/api/Rules/CreateRule"
			: "https://localhost:7140/api/Rules/EditRule";
		const method = newFlag ? axios.post : axios.put;
		const { data } = await method(url, newRule, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
    async function handleSubmit(e){
		try {
			const success = await createRule();
			toast({
				title: "Rule created.",
				description: "Rule Successfully added to the DB",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			navigate("/Scenario");
		} catch (error) {
			toast({
				title: "Error Creating Rule.",
				description: "Something went wrong",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}
	return (
		<>
			<Box
				borderWidth="1px"
				rounded="lg"
				shadow="1px 1px 3px rgba(0,0,0,0.3)"
				maxWidth={800}
				p={6}
				m="10px auto"
				as="form"
			>
				<form>
					<FormCard ruleInfo={ruleDetail} updateForm={updateDetails} updateOption={renderOptions} stateInfo={location.state} />
					<Button
						mt="2%"
						w="7rem"
						colorScheme="blue"
						variant="solid"
						onClick={() => {
                            handleSubmit()
						}}
					>
                        {location.state ? "Update" : "Create"}
					</Button>
				</form>
			</Box>
		</>
	);
}
