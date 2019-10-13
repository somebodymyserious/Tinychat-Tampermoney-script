// ==UserScript==
// @name         TC TEST
// @match        https://tinychat.com/*
// @exclude      https://tinychat.com
// @exclude      https://tinychat.com/room/*?notheme
// @exclude      https://tinychat.com/*?notheme
// @exclude      https://tinychat.com/coins/*
// @exclude      https://tinychat.com/settings/*
// @exclude      https://tinychat.com/promote/*
// @exclude      https://tinychat.com/subscription/*
// @exclude      https://tinychat.com/gifts/*
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// ==/UserScript==

window.addEventListener('load', function() {
    'use strict';

    var timer = setInterval(connect, 100);
    var storage = {};
    var storageAccessInterval;

    function TC_Shadowroot() {
        if(window.content.shadowRoot !== undefined && window.content.shadowRoot !== null) {
            return window.content.shadowRoot;
        }
        return false;
    }

    function TC_Get_Node(index) {
        var shadowRoot = TC_Shadowroot();
        console.log(shadowRoot);
        if(shadowRoot.children.item(index) !== null) {
            return shadowRoot.children.item(index);
        }
        return false;
    }

    function TC_Sub_Shadowroot(index) {
        var shadowRoot = TC_Shadowroot();
        if(shadowRoot.children.item(index) !== null) {
            if(shadowRoot.children.item(index).shadowRoot !== undefined && shadowRoot.children.item(index).shadowRoot !== null) {
                return shadowRoot.children.item(index).shadowRoot;
            }
        }
        return false;
    }

    function TC_Get_Sub_Node(root_index, child_index) {
        var shadowRoot = TC_Sub_Shadowroot(root_index);
        if(shadowRoot.children.item(child_index) !== null) {
            return shadowRoot.children.item(child_index);
        }
        return false;
    }

    function TC_Get_Node_Shadowroot(node, index) {
        console.log(index);
        if(index !== undefined) {
            if(node.children.item(index) !== null) {
                return node.children.item(index).shadowRoot;
            }
        } else {
            return node.shadowRoot;
        }
        return false;
    }

    function TC_Get_Node_Child(node, index) {
        if(node.children.item(index) !== null) {
            return node.children.item(index);
        }
        return false;
    }

    function TC_Content() {
        return window.content;
    }

    function TC_View_Chatroom() {
        console.dir(TC_Content().__data.chatroom);
    }

    function TC_Chatroom(TC_Key, TC_Val) {
        var data = TC_Content().__data.chatroom;
        data[TC_Key] = TC_Val;
        TC_Chatroom_DefaultChatroom(TC_Key, TC_Val);
        window.content.__data.chatroom = data;
    }

    function TC_Debug(enabled) {
        console.log("Debug " + enabled);
        var data = TC_Content().__data.chatroom.app;
        data.debug = enabled;
        window.content.__data.chatroom.app = data;
    }

    function TC_Chatroom_DefaultChatroom(TC_Key, TC_Val) {
        var data = TC_Content().__data.chatroom.app.defaultChatroom;
        data[TC_Key] = TC_Val;
        window.content.__data.chatroom.app.defaultChatroom = data;
    }

    function TC_Username(username) {
        var data = TC_Content().__data.chatroom;
        if(data.nickname !== username) {

           TC_Chatroom("nickname",username);
           TC_Chatroom("mute", true);
           TC_Chatroom("micmuted", true);
           TC_Chatroom("fullscreen", true);

           return false;
        }
        return true;
    }

    function TC_Style_Id(where, elementId, elementStyle) {
        where.getElementById(elementId).style = elementStyle;
    }

    function TC_Shadow_Style(shadowRoot, shadowStyle) {
        shadowRoot.style = shadowStyle;
    }
    
    function TC_Message_Process(data) {
        
    }

    function TC_Change() {
        // Hide the left sidemenu
        TC_Style_Id(document, "nav-static-wrapper", "display:none;");
        TC_Style_Id(document, "menu-icon", "display: none;");
        var TC_Sidemenu = TC_Get_Sub_Node(1, 1);
        var TC_Sidemenu_Shadowroot = TC_Sub_Shadowroot(1);

        if(TC_Sidemenu !== false) {
            TC_Shadow_Style(TC_Sidemenu, "left: 0;background-color: #000; color: #fff;");
            if(TC_Sidemenu_Shadowroot !== false) {
                TC_Style_Id(TC_Sidemenu_Shadowroot, "top-buttons-wrapper", "display: none;");
                TC_Style_Id(TC_Sidemenu_Shadowroot, "user-info", "display: none;");
            }
        }

        var TC_Room = TC_Get_Node(2);

        if(TC_Room !== false) {
            TC_Shadow_Style(TC_Room, "padding-left: 188px");
        }

        var TC_Room_Shadowroot = TC_Get_Node_Shadowroot(TC_Room, 0);
        var TC_Room_Header_Shadowroot = TC_Get_Node_Child(TC_Room_Shadowroot, 1);

        if(TC_Room_Header_Shadowroot !== false) {
            TC_Style_Id(TC_Room_Shadowroot, "room-header", "display: none;");
        }

        var TC_Room_Content = TC_Get_Node_Child(TC_Room, 1);
        console.log("TC_Room_Content");
        console.log(TC_Room_Content);
        var TC_Room_Videolist = TC_Get_Node_Child(TC_Room_Content, 0);
        console.log("TC_Room_Videolist");
        console.log(TC_Room_Videolist);
        var TC_Room_Videolist_Shadowroot = TC_Get_Node_Shadowroot(TC_Room_Videolist);
        console.log("TC_Room_Videolist_Shadowroot");
        console.log(TC_Room_Videolist_Shadowroot);

        var TC_Room_Videolist_Wrapper = TC_Get_Node_Child(TC_Room_Videolist_Shadowroot, 1);
        console.log("TC_Room_Videolist_Wrapper");
        console.log(TC_Room_Videolist_Wrapper);

        // Hide the video header
        var TC_Room_Videolist_Header = TC_Get_Node_Child(TC_Room_Videolist_Wrapper, 1);
        TC_Room_Videolist_Header.style = "display: none;";
        console.log("TC_Room_Videolist_Header");
        console.log(TC_Room_Videolist_Header);

        // Style video content
        var TC_Room_Videolist_Content = TC_Get_Node_Child(TC_Room_Videolist_Wrapper, 2);
        TC_Room_Videolist_Content.style = "background: #000; color: #fff;";
        console.log("TC_Room_Videolist_Content");
        console.log(TC_Room_Videolist_Content);

        // Style video footer
        var TC_Room_Videolist_Footer = TC_Get_Node_Child(TC_Room_Videolist_Wrapper, 3);
        TC_Room_Videolist_Footer.style = "background: #000; color: #fff;";
        console.log("TC_Room_Videolist_Footer");
        console.log(TC_Room_Videolist_Footer);

        // Style the button
        var TC_Room_Videolist_Button = TC_Get_Node_Child(TC_Room_Videolist_Footer, 2);
        TC_Room_Videolist_Button.style = "background-color: #00f5ff; color: #000;";

        var TC_Room_Videolist_Button_1 = TC_Get_Node_Child(TC_Room_Videolist_Button, 0);
        TC_Room_Videolist_Button_1.style = "background-color: #00f5ff; color: #000;";

        var TC_Room_Videolist_Button_2 = TC_Get_Node_Child(TC_Room_Videolist_Button, 1);
        TC_Room_Videolist_Button_2.style = "background-color: #00f5ff; color: #000;";


        // Style the user area
        var TC_Room_Chatlog = TC_Get_Node_Child(TC_Room_Content, 1);
        console.log("TC_Room_Chatlog");
        console.log(TC_Room_Chatlog);

        var TC_Room_Chatlog_Shadowroot = TC_Get_Node_Shadowroot(TC_Room_Chatlog);
        console.log("TC_Room_Chatlog_Shadowroot");
        console.log(TC_Room_Chatlog_Shadowroot);

        var TC_Room_Chatlog_Wider = TC_Get_Node_Child(TC_Room_Chatlog_Shadowroot, 1);
        TC_Room_Chatlog_Wider.style = "display: none;";

        var TC_Room_Chatlog_Wrapper = TC_Get_Node_Child(TC_Room_Chatlog_Shadowroot, 2);
        TC_Room_Chatlog_Wrapper.style = "background-color: #000 !important; color: #00f5ff !important;";

        var TC_Room_Chatlog_Position = TC_Get_Node_Child(TC_Room_Chatlog_Wrapper, 0);
        console.clear();
        console.log("TC_Room_Chatlog_Position");
        console.log(TC_Room_Chatlog_Position);

        var TC_Room_Chatlog_Form = TC_Get_Node_Child(TC_Room_Chatlog_Position, 3);

        var TC_Room_Chatlog_Textarea = TC_Get_Node_Child(TC_Room_Chatlog_Form, 1);
        TC_Room_Chatlog_Textarea.style = "background-color: #000 !important; color: #00f5ff !important; border: none !important; border: solid 1px #00f5ff; border-radius: none !important;";

        // When typing?
//         if (TC_Room_Chatlog_Textarea.addEventListener) {
//             TC_Room_Chatlog_Textarea.addEventListener('input', function() {
//                 console.log("TC_Room_Chatlog");
//                 console.log(TC_Room_Chatlog);
//             }, false);
//         } else if (TC_Room_Chatlog_Textarea.attachEvent) {
//             TC_Room_Chatlog_Textarea.attachEvent('onpropertychange', function() {
//                 console.log("TC_Room_Chatlog");
//                 console.log(TC_Room_Chatlog);
//             });
//         }


        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        var value = TC_Room_Chatlog_Textarea.value;
        value = dateTime + ': ' + value;
        TC_Room_Chatlog_Textarea.value = value;

        // On form submit, add the time and date OKAY?
        TC_Room_Chatlog_Form.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("Form submitted");
            var value = TC_Room_Chatlog_Textarea.value;
            value = dateTime + ': ' + value;
            TC_Room_Chatlog_Textarea.value = value;
            return true;
        });


        // Let's check for any new messages and do something with them...
        var TC_Room_Chat_Messages_Wrapper = TC_Get_Node_Child(TC_Room_Chatlog_Position, 2);
        console.log("TC_Room_Chat_Messages_Wrapper");
        console.log(TC_Room_Chat_Messages_Wrapper);

        var TC_Room_Chat_Messages = TC_Get_Node_Child(TC_Room_Chat_Messages_Wrapper, 0);

        var lastCount = TC_Room_Chat_Messages.children.length;
// Detect a new message and display in to the console
        var chatInterval = setInterval(function() {
            var currentCount = TC_Room_Chat_Messages.children.length;
            if(currentCount > lastCount) {
              lastCount = currentCount;
              console.log(TC_Room_Chat_Messages);
              console.log("New message detected");
              var TC_Message = TC_Get_Node_Child(TC_Room_Chat_Messages, currentCount - 2);
              console.log("TC_Message");
              console.log(TC_Message);

              var TC_Message_Content_Wrapper = TC_Get_Node_Child(TC_Message, 3);
              console.log("TC_Message_Content_Wrapper");
              console.log(TC_Message_Content_Wrapper);

              var TC_Message_Content = TC_Get_Node_Child(TC_Message_Content_Wrapper, 0);
              console.log("TC_Message_Content");
              console.log(TC_Message_Content);

              TC_Message_Process(TC_Message_Content);

            }
        }, 1000);


    }

    function connect() {
        if(window.content.__data !== undefined) {
            if(window.content.getElementsByTagName("TINYCHAT-WEBRTC-APP")) {
                var username = "NOTFAT_" + Math.floor((Math.random() * 100) + 1);
                var set_TC_Username = setTimeout(TC_Username, 100, username);
                if(TC_Username(username)) {
                    TC_View_Chatroom();
                    TC_Debug(true);
                    clearInterval(timer);
                    //console.log(TC_Shadowroot());
                    TC_Change();
                }
            }
        }
    }

}, false);