import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Labels from "../../constants/Labels";
import {TextField} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ContractorDto} from "../../models/contractor/ContractorDto";
import {canBeSaved, cannotBeSave} from "../../common/saveButtonSlice";
import {useDispatch} from "react-redux";
import {isNameValid} from "../../api/apiValidator";
import {CONTRACTORS_URI, getByNip} from "../../api/apiContractors";
import Button from "@mui/material/Button";
import {errorSnackbar, successSnackbar} from "../../common/snackbarSlice";

export interface EditableDictionaryProps {
    value: ContractorDto,
    setNewValue: (newValue: ContractorDto) => void
}

const EditableContractors = (props: EditableDictionaryProps) => {
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState<boolean>(false);
    const [errorName, setErrorName] = useState(false);

    useEffect(() => {
        if (!!props.value.name) {
            dispatch(canBeSaved())
        } else {
            dispatch(cannotBeSave())
        }
    }, [])

    const fetchByNip = async () => {
        let govContractor = await getByNip(props.value.nip);
        if (!!govContractor.result && !!govContractor.result.subject) {
            let newName = govContractor.result.subject.name;
            let newAddress = !!govContractor.result.subject.residenceAddress ? govContractor.result.subject.residenceAddress : govContractor.result.subject.workingAddress;
            validate(newName);
            props.setNewValue({
                    ...props.value,
                    name: newName,
                    address: newAddress
                }
            );
            dispatch(successSnackbar("Fetch correctly"))
        } else {
            dispatch(errorSnackbar(govContractor.message))
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNewValue({
            ...props.value,
            [event.target.name]: event.target.value.toUpperCase()
        });
    }

    const isEmailFormatValid = (email: string) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
        if (!isEmailFormatValid(props.value.email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }
    };

    function getEmailErrorMsg() {
        return "Email format not correct";
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newName = event.target.value.toUpperCase();
        validate(newName);
        props.setNewValue({
            ...props.value,
            [event.target.name]: newName
        });
    }

    const validate = (newName: string) => {
        if (!!newName) {
            validateIfExist(newName);
        } else {
            setErrorName(true)
            dispatch(cannotBeSave())
        }
    }

    const getHelperNameTxt = () => {
        if (errorName) {
            return !!props.value.name ? 'Given name already exists' : "Name cannot be empty";
        }
        return '';
    }

    const validateIfExist = (newName: string) => {
        isNameValid(CONTRACTORS_URI, newName).then((isValid) => {
            if (isValid) {
                setErrorName(false)
                dispatch(canBeSaved())
            } else {
                setErrorName(true)
                dispatch(cannotBeSave())
            }
        })
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container={true} rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} style={{color: "#192a56"}}>
                <Grid item={true} xs={6} style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <TextField
                        required
                        id="name"
                        label={Labels.NAME}
                        name="name"
                        value={props.value.name}
                        onChange={handleNameChange}
                        variant="standard"
                        onKeyDown={(e) => {e.stopPropagation();}}
                        error={errorName}
                        helperText={getHelperNameTxt()}
                        onBlur={() => validate(props.value.name)}
                    />
                </Grid>
                    <Grid item={true} xs={4} style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                        <TextField
                            id="nip"
                            label={Labels.NIP}
                            name="nip"
                            defaultValue={props.value.nip}
                            onChange={handleChange}
                            variant="standard"
                            onKeyDown={(e) => {e.stopPropagation();}}
                        />
                    </Grid>
                    <Grid item={true} xs={2} style={{display: 'flex', justifyContent: "end", alignItems: "end"}}>
                        <Button
                            disabled={false}
                            color="success"
                            variant={'contained'}
                            onClick={() => fetchByNip()}
                            style={{margin: '0 0 0 0'}}>
                            {Labels.FETCH}
                        </Button>
                    </Grid>

                <Grid item={true} xs={6} style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <TextField
                        id="address"
                        label={Labels.ADDRESS}
                        name="address"
                        value={props.value.address}
                        onChange={handleChange}
                        variant="standard"
                        onKeyDown={(e) => {e.stopPropagation();}}
                    />
                </Grid>
                <Grid item={true} xs={6} style={{display: 'flex', justifyContent: "start", alignItems: "start", width: "100%"}}>
                    <TextField
                        id="phoneNumber"
                        label={Labels.PHONE_NUMBER}
                        name="phoneNumber"
                        defaultValue={props.value.phoneNumber}
                        onChange={handleChange}
                        variant="standard"
                        style={{width: "100%"}}
                        onKeyDown={(e) => {e.stopPropagation();}}
                    />
                </Grid>
                <Grid item={true} xs={6} style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <TextField
                        id="email"
                        type="email"
                        label={Labels.EMAIL}
                        name="email"
                        defaultValue={props.value.email}
                        onChange={handleChange}
                        variant="standard"
                        error={emailError}
                        onBlur={handleEmailBlur}
                        helperText={emailError ? getEmailErrorMsg() : ""}
                        onKeyDown={(e) => {e.stopPropagation();}}
                    />
                </Grid>
            </Grid>
        </Box>
    )

}

export default EditableContractors;
