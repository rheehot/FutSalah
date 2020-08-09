import { Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useState } from "react";

import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

function AddInfoDialog(props) {
  const { open, onClose, modifyTeamList, teamID } = props;

  const [searchWord, setSearchWord] = useState("");
  const [serachTeamList, setSerachTeamList] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const addMember = (userInfo, teamID) => {
    const userTeamConn = {
      userID: userInfo.userID,
      teamID,
    };
    console.log(userTeamConn);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/crew`,
      data: userTeamConn,
    })
      .then(() => {
        console.log("팀원 추가");
        console.log(userInfo);
        if (userInfo.profileURL !== null) {
          if (userInfo.profileURL.indexOf("http") === -1) {
            userInfo.profileURL =
              process.env.REACT_APP_S3_BASE_URL + "/" + userInfo.profileURL;
          }
        }
        modifyTeamList(userInfo);
      })
      .catch((e) => {
        console.log("error", e);
      });
    handleClose();
  };

  const searchUser = (name) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/` + name,
    })
      .then((res) => {
        const searchList = res.data;
        axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/member/${teamID}`,
        })
          .then((res) => {
            console.log("팀원으로 속하지 않은 유저 검색");
            setSerachTeamList(
              searchList.filter(
                (sl) =>
                  res.data.find((data) => data.userID === sl.userID) ===
                  undefined
              )
            );
          })
          .catch(() => {
            console.log("으악으악!");
          });
      })
      .catch(() => {
        console.log("으악!");
      });
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
              searchUser(searchWord);
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
                            addMember(list, teamID);
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
