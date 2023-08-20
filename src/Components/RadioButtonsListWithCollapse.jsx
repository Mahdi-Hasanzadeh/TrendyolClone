import {
  FormControlLabel,
  Radio,
  Collapse,
  List,
  RadioGroup,
} from "@mui/material";

const RadioButtonsListWithCollapse = ({
  radioButtonValue,
  radioButtonOnChange,
  radioButtonsInfo,
  open,
}) => {
  return (
    <Collapse in={open} unmountOnExit timeout={"auto"}>
      <List disablePadding>
        <RadioGroup value={radioButtonValue} onChange={radioButtonOnChange}>
          {radioButtonsInfo.map((item) => {
            return (
              <FormControlLabel
                key={item}
                control={<Radio color="warning" />}
                sx={{
                  m: 0,
                }}
                label={item}
                value={item}
              />
            );
          })}
        </RadioGroup>
      </List>
    </Collapse>
  );
};

export default RadioButtonsListWithCollapse;
