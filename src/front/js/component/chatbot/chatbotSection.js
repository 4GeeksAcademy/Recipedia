import React from "react";
import { ChatBot } from "./chatbot";

export const ChatbotSection = () => {

    let sampleConversation = [
        "Hi",
        "My name is Fry",
        "Where is China?",
        "What is the population of China?",
        "Bye"
    ];
    let config = {
        botName: 'Duck Duck Go Bot',
        inputs: '#humanInput',
        inputCapabilityListing: true,
        engines: [ChatBot.Engines.duckduckgo()],
        normalizer: [function( text ) {
            return text.replace('!' , '');
        } , 'trim' ],
        addChatEntryCallback: function(entryDiv, text, origin) {
            entryDiv.delay(200).slideDown();
        }
    };
    ChatBot.init(config);
    ChatBot.setBotName("Duck Duck Go Bot");
    ChatBot.addPattern("^hi$", "response", "Howdy, friend", undefined, "Say 'Hi' to be greeted back.");
    ChatBot.addPattern("^bye$", "response", "See you later buddy", undefined, "Say 'Bye' to end the conversation.");
    ChatBot.addPattern("(?:my name is|I'm|I am) (.*)", "response", "hi $1, thanks for talking to me today", function (matches) {
        ChatBot.setHumanName(matches[1]);
    },"Say 'My name is [your name]' or 'I am [name]' to be called that by the bot");
    ChatBot.addPattern("(what is the )?meaning of life", "response", "42", undefined, "Say 'What is the meaning of life' to get the answer.");
    ChatBot.addPattern("compute ([0-9]+) plus ([0-9]+)", "response", undefined, function (matches) {
        ChatBot.addChatEntry("That would be "+(1*matches[1]+1*matches[2])+".","bot");
    },"Say 'compute [number] plus [number]' to make the bot your math monkey");



    return (
        <div id="demo">
        <div id="chatBotCommandDescription"></div>
        <input id="humanInput" type="text" placeholder="Say something" />

        <div className="button" onClick={()=>{if (!ChatBot.playConversation(sampleConversation,4000)) {alert('conversation already running')}}}>Play sample conversation!</div>
        <div className="button" onClick={()=>{$('#chatBotCommandDescription').slideToggle()}} style={{marginRight:"10px"}}>What can I say?</div>

        <div style={{clear: "both"}}>&nbsp;</div>

        <div id="chatBot">
        <div id="chatBotThinkingIndicator"></div>
        <div id="chatBotHistory"></div>
        </div>
        </div>
    )
}