import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface PropsInterface {
  icon: string;
}

export interface ListMenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: ListMenuItem[];
}

interface MainListPropsInterface {
  items: ListMenuItem[];
}

const useStyles = makeStyles((theme) => ({
  parent: {
    fontWeight: "bold",
  },
}));

const MaterialIcon = (props: PropsInterface) => {
  let resolved = require(`@material-ui/icons/${props.icon}`).default;

  return React.createElement(resolved);
};

export const MainListItems = (props: MainListPropsInterface) => {
  const [open, setOpen] = useState("");
  const classes = useStyles();
  const toggleMenuItem = (event: any, key: string, hasChildren: boolean) => {
    event.preventDefault();
    if (hasChildren) {
      const newValue = key === open ? "" : key;
      setOpen(newValue);
    }
  };

  return (
    <>
      {props.items.map((item) => {
        const isItemOpen = item.key === open;
        const isItemCollapseShown = !!(
          item.children && item.children.length > 0
        );
        return (
          <div key={item.key}>
            <ListItem
              className={classes.parent}
              button
              onClick={(e) => toggleMenuItem(e, item.key, isItemCollapseShown)}
            >
              <ListItemIcon>
                {item.icon && <MaterialIcon icon={item.icon} />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {isItemCollapseShown ? (
                isItemOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                ""
              )}
            </ListItem>
            {item.children ? (
              <>
                <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Divider />
                    {item.children.map((child: ListMenuItem) => (
                      <ListItem dense button key={child.key}>
                        <ListItemIcon>
                          {child.icon && <MaterialIcon icon={child.icon} />}
                        </ListItemIcon>
                        <ListItemText primary={child.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};
