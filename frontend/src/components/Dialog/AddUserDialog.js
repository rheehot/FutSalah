import React, { useState } from "react";

import { Dialog, DialogTitle, TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.js";

function AddInfoDialog(props) {
  const { open, onClose, modifyTeamList } = props;

  // 테스트데이터

  // 검색 결과 목록
  const testTeamList = [
    {
      id: 5,
      name: "김아두이노",
      position: "Fixo",
      age: 1999,
      height: 20,
      weight: 10,
    },
    {
      id: 6,
      name: "이풋살",
      position: "Pivo",
      age: 1990,
      height: 200,
      weight: 300,
    },
    {
      id: 7,
      name: "박살라",
      age: 2012,
      height: 500,
      weight: 300,
      position: "ALA",
    },
    {
      id: 8,
      name: "최팀구함",
      position: "ALL",
      age: 2011,
      height: 120,
      weight: 40,
    },
  ];

  const [searchWord, setSearchWord] = useState("");
  const [serachTeamList, setSerachTeamList] = useState(testTeamList);

  const handleClose = () => {
    onClose();
  };

  const addMember = (userInfo) => {
    modifyTeamList(userInfo);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>팀원 추가</DialogTitle>
      <List>
        <ListItem>
          <input
            type="text"
            style={{ lineHeight: "30px" }}
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <Button
            color="info"
            size="sm"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              console.log("회원 검색!!!!!");
            }}
          >
            검색
          </Button>
        </ListItem>
        <ListItem>
          <TableContainer>
            <Table>
              <TableBody>
                {serachTeamList.map((list) => {
                  // setChecked(checked.concat(false));
                  return (
                    <TableRow>
                      {/* <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={checked}
                              // onChange={() => (setChecked(!checked))}
                              value={list.name}
                              // checkedIcon={
                              //   <Check className={classes.checkedIcon} />
                              // }
                              // icon={<Check className={classes.uncheckedIcon} />}
                              // classes={{
                              //   checked: classes.checked,
                              //   root: classes.checkRoot,
                              // }}
                            />
                          }
                          // classes={{
                          //   label: classes.label,
                          //   root: classes.labelRoot,
                          // }}
                          label={list.name}
                        />
                      </TableCell> */}
                      <TableCell>{list.name}</TableCell>
                      <TableCell>{list.position}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            addMember(list);
                          }}
                        >
                          추가
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
        <ListItem>
          <Button color="primary" onClick={handleClose}>
            나가기
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AddInfoDialog;