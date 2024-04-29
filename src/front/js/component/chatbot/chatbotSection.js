// import React, { useEffect, useState } from "react";
// import $ from "jquery";

// export const ChatbotSection = () => {
//   const [commands, setCommands] = useState([]);

//   let datalist = document.getElementById("chatBotCommands");

//   if (!datalist) {
//     datalist = document.createElement("datalist");
//     datalist.id = "chatBotCommands";
//     document.body.appendChild(datalist);
//   } else {
//     datalist.innerHTML = "";
//   }

//   commands.forEach((command) => {
//     const option = document.createElement("option");
//     option.value = command;
//     datalist.appendChild(option);
//   });

//   //   useEffect(() => {
//   //     if (!datalist) {
//   //       datalist = document.createElement("datalist");
//   //       datalist.id = "chatBotCommands";
//   //       document.body.appendChild(datalist);
//   //     } else {
//   //       datalist.innerHTML = "";
//   //     }

//   //     commands.forEach((command) => {
//   //       const option = document.createElement("option");
//   //       option.value = command;
//   //       datalist.appendChild(option);
//   //     });
//   //   }, [commands]);
//   let ChatBot = (function () {
//     //// common lets
//     // custom patterns and rewrites
//     let patterns;

//     // the bot's name
//     let botName;

//     // the human's name
//     let humanName;

//     // the html (text / image etc.) that is displayed when the bot is busy
//     let thinkingHtml;

//     // a selector to all inputs the human can type to
//     let inputs;

//     // whether to list the capabilities below the input field
//     let inputCapabilityListing;

//     // the example phrases that can be said (to be listed under the input field)
//     let examplePhrases = [];

//     // the engines to use for answering queries that are not caught by simple patterns
//     let engines;

//     // whether a sample conversation is running
//     let sampleConversationRunning = false;

//     // a callback for after a chat entry has been added
//     let addChatEntryCallback;

//     // list of normalize human text before check pattern
//     let normalizer = [];

//     // list all the predefined commands and the commands of each engine
//     function updateCommandDescription() {
//       let description = "";

//       // first explain manually defined commands and then all by all used engines
//       let descriptions = [];

//       let i, j;
//       for (i = 0; i < patterns.length; i++) {
//         if (patterns[i].description != undefined) {
//           descriptions.push(patterns[i].description);
//         }
//       }
//       for (i = 0; i < engines.length; i++) {
//         let caps = engines[i].getCapabilities();
//         for (j = 0; j < caps.length; j++) {
//           descriptions.push(caps[j]);
//         }
//       }

//       examplePhrases = [];
//       for (i = 0; i < descriptions.length; i++) {
//         let pdesc = descriptions[i].replace(
//           /(['"][^'"]+['"])/gi,
//           '<span class="phraseHighlight">$1</span>'
//         );
//         pdesc = pdesc.replace(
//           /(\[[^\[\]]+\])/gi,
//           '<span class="placeholderHighlight">$1</span>'
//         );
//         //console.log(pdesc);
//         let matches = pdesc.match(
//           /<span class=['"]phraseHighlight["']>['"](.+?)['"]<\/span>/gi
//         );
//         //console.log(matches);
//         if (matches != null) {
//           //console.log(matches);
//           for (j = 0; j < matches.length; j++) {
//             let cleanMatch = matches[j].replace(/<\/?span[^>]*>/gi, "");
//             examplePhrases.push(cleanMatch.replace(/['"]/gi, ""));
//           }
//         }
//         description += '<div class="commandDescription">' + pdesc + "</div>";
//       }

//       //   let datalist = $("#chatBotCommands");
//       let datalist = document.getElementById("chatBotCommands");

//       //   if (datalist.size() == 0) {
//       //     datalist = $('<datalist id="chatBotCommands">');
//       //     $("body").append(datalist);
//       //   } else {
//       //     datalist.html("");
//       //   }
//       //     if (!datalist) {
//       //         datalist = document.createElement('datalist');
//       //         datalist.id = 'chatBotCommands';
//       //         document.body.appendChild(datalist);
//       //       } else {
//       //         datalist.innerHTML = '';
//       //       }

//       //       commands.forEach(command => {
//       //       const option = document.createElement('option');
//       //       option.value = command;
//       //       datalist.appendChild(option);
//       //     });
//       //   }, [commands]);

//       for (i = 0; i < examplePhrases.length; i++) {
//         datalist?.append(
//           $('<option value="' + examplePhrases[i] + '"></option>')
//         );
//       }

//       //console.log(examplePhrases);

//       $("#chatBotCommandDescription").html(description);
//     }

//     // type writer
//     function playConversation(state, pauseLength) {
//       setTimeout(function () {
//         let newValue = "";
//         if ($(inputs).val() != "|") {
//           newValue += $(inputs).val();
//         }
//         newValue += state.currentInput.slice(state.start, state.start + 1);
//         $(inputs).val(newValue);
//         state.start++;

//         if (state.start < state.currentInput.length) {
//           // keep typing
//           playConversation(state, pauseLength);
//         } else {
//           // press enter and wait for some time and then write the next entry
//           ChatBot.addChatEntry(state.currentInput, "human");
//           ChatBot.react(state.currentInput);
//           $(inputs).val(state.currentInput);

//           setTimeout(function () {
//             state.conversationArrayIndex++;
//             state.conversationArrayIndex =
//               state.conversationArrayIndex % state.conversationArray.length;

//             // did we cycle through the conversation array? if so, stop
//             if (state.conversationArrayIndex == 0) {
//               $("#chatBotConversationLoadingBar").remove();
//               sampleConversationRunning = false;
//               return;
//             }

//             state.start = 0;
//             $(inputs).val("|");
//             state.currentInput =
//               state.conversationArray[state.conversationArrayIndex];
//             playConversation(state, pauseLength);
//           }, pauseLength);

//           let chclb = $("#chatBotConversationLoadingBar");
//           if (chclb.size() == 0) {
//             chclb = $('<div id="chatBotConversationLoadingBar"></div>');
//             chclb.css("position", "absolute");
//             $("body").append(chclb);
//           }

//           let left = $(inputs).offset().left;
//           let top = $(inputs).offset().top + $(inputs).outerHeight() - 3;
//           chclb.css("left", left + "px");
//           chclb.css("top", top + "px");

//           chclb.animate(
//             {
//               width: $(inputs).outerWidth() + "px",
//             },
//             pauseLength,
//             function () {
//               chclb.css("width", "0");
//             }
//           );
//         }
//       }, Math.random() * 120 + 10);
//     }

//     return {
//       Engines: {
//         // the webknox API: http://webknox.com/api
//         webknox: function (apiKey) {
//           // patterns that the engine can resolve
//           let capabilities = [
//             "Ask for stock prices like 'stock price apple' or '[company] stock'.",
//             "Ask for distances as in 'how far is Perth from Melbourne' or 'distance between [place1] and [place2]'.",
//             "Want to know what the weather is like, just ask like 'weather in San Diego, California'.",
//             "Let WebKnox tell you a joke, just say 'tell me a joke'.",
//             "Convert units, e.g. '2.4 miles in kilometers' or '4 tablespoons to ml?'.",
//             "Get synonyms for a word, e.g. 'synonyms for car'.",
//             "Ask for quotes like 'quotes about [topic]' or 'quotes about love'.",
//             "Ask for quotes from a person 'quotes by [person]' or 'quotes by aristotle'.",
//             "Ask for recipes like 'spaghetti recipes' or 'chocolate donuts'.",
//             "Ask for nutrient contents like 'vitamin a in 2 carrots' or 'calories is 1 cup of butter'.",
//             "Convert ingredients like '2 cups of butter in grams'.",
//             "If you want more results, just say 'more'.",
//             "For more similar results say 'more like the first/second/third...'.",
//             "Or just ask anything that comes to mind like 'Who was pope in 1499?' or 'Who directed braveheart?'.",
//           ];

//           // the context id for the current conversation
//           let contextId = Math.random() * 100000;

//           return {
//             react: function (query) {
//               $.get(
//                 "https://webknox-question-answering.p.mashape.com/questions/converse?mashape-key=" +
//                   apiKey +
//                   "&contextId=" +
//                   contextId +
//                   "&text=" +
//                   encodeURIComponent(query),
//                 function (data) {
//                   let content = data.answerText;

//                   if (data.media != undefined) {
//                     content += "<br>";

//                     for (let i = 0; i < data.media.length; i++) {
//                       let ob = data.media[i];
//                       content +=
//                         '<div class="imgBox">' +
//                         '<img src="' +
//                         ob.image +
//                         '" />' +
//                         '<div class="title">' +
//                         ob.title +
//                         "</div>" +
//                         '<div class="actions">' +
//                         '<div class="button blue" onclick="document.location.href=\'' +
//                         ob.link +
//                         "'\">Details</div>" +
//                         "<br>" +
//                         '<div class="button blue" onclick=" ChatBot.addChatEntry(\'more like number ' +
//                         (i + 1) +
//                         "','human');ChatBot.react('more like " +
//                         (i + 1) +
//                         "');\">More like this</div>" +
//                         "</div>" +
//                         "</div>";
//                     }
//                   }

//                   ChatBot.addChatEntry(content, "bot");
//                   ChatBot.thinking(false);
//                 }
//               );
//             },
//             getCapabilities: function () {
//               return capabilities;
//             },
//             getSuggestUrl: function () {
//               return (
//                 "https://webknox-question-answering.p.mashape.com/questions/converse/suggest?mashape-key=" +
//                 apiKey +
//                 "&query="
//               );
//             },
//           };
//         },

//         // the spoonacular API: http://spoonacular.com/food-api
//         spoonacular: function (apiKey) {
//           // patterns that the engine can resolve
//           let capabilities = [
//             "Ask for recipes like 'chicken recipes' or 'spaghetti with shrimp'",
//             "Ask for nutrient contents like 'vitamin a in 2 carrots' or 'calories is 1 cup of butter'",
//             "Convert something with '2 cups of butter in grams'",
//             "If you want more results, just say 'more'",
//             "For more similar results say 'more like the first/second/third...'",
//             "Let spoonacular tell you a joke, just say 'tell me a joke'.",
//             "Want to learn some food trivia, just say 'food trivia'.",
//           ];

//           // the context id for the current conversation
//           let contextId = Math.random() * 100000;

//           return {
//             react: function (query) {
//               $.get(
//                 "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/converse?mashape-key=" +
//                   apiKey +
//                   "&contextId=" +
//                   contextId +
//                   "&text=" +
//                   encodeURIComponent(query),
//                 function (data) {
//                   let content = data.answerText;

//                   if (data.media != undefined) {
//                     content += "<br>";

//                     for (let i = 0; i < data.media.length; i++) {
//                       let ob = data.media[i];
//                       content +=
//                         '<div class="imgBox">' +
//                         '<img src="' +
//                         ob.image +
//                         '" />' +
//                         '<div class="title">' +
//                         ob.title +
//                         "</div>" +
//                         '<div class="actions">' +
//                         '<div class="button blue" onclick="document.location.href=\'' +
//                         ob.link +
//                         "'\">Details</div>" +
//                         "<br>" +
//                         '<div class="button blue" onclick=" ChatBot.addChatEntry(\'more like number ' +
//                         (i + 1) +
//                         "','human');ChatBot.react('more like " +
//                         (i + 1) +
//                         "');\">More like this</div>" +
//                         "</div>" +
//                         "</div>";
//                     }
//                   }

//                   ChatBot.addChatEntry(content, "bot");
//                   ChatBot.thinking(false);
//                 }
//               );
//             },
//             getCapabilities: function () {
//               return capabilities;
//             },
//             getSuggestUrl: function () {
//               return (
//                 "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/converse/suggest?mashape-key=" +
//                 apiKey +
//                 "&query="
//               );
//             },
//           };
//         },

//         duckduckgo: function () {
//           // patterns that the engine can resolve
//           let capabilities = [
//             "Ask what something is like 'What is DNA'?",
//             "Ask where something is like 'Where is China'?",
//             "Ask about a person like 'Who is Bill Gates'?",
//             "Say a movie/person/location name like 'Braveheart' to get information about that entity",
//             "Say a something like 'simpsons characters' to get information about that phrase",
//           ];

//           return {
//             react: function (query) {
//               $.ajax({
//                 type: "GET",
//                 url:
//                   "https://api.duckduckgo.com/?format=json&pretty=1&q=" +
//                   encodeURIComponent(query),
//                 dataType: "jsonp",
//               }).done(function (data) {
//                 let content = data.AbstractText;

//                 // no direct answer? tell about related topics then
//                 if (content == "" && data.RelatedTopics.length > 0) {
//                   content = "<p>I found multiple answers for you:</p>";

//                   let media = [];
//                   for (let i = 0; i < data.RelatedTopics.length; i++) {
//                     let ob = data.RelatedTopics[i];
//                     if (ob.Result == undefined) {
//                       continue;
//                     }
//                     if (ob.Icon.URL != "" && ob.Icon.URL.indexOf(".ico") < 0) {
//                       media.push(ob.Icon.URL);
//                     }

//                     content +=
//                       "<p>" + ob.Result.replace("</a>", "</a> ") + "</p>";
//                   }

//                   ///content += '<img src="' + ob.Icon.URL + '" align="left" />' +

//                   for (i = 0; i < media.length; i++) {
//                     let m = media[i];
//                     content +=
//                       '<img src="' + m + '" style="margin-right:5px"/>';
//                   }
//                 } else {
//                   if (data.Image != undefined && data.Image != "") {
//                     content += "<br>";

//                     content +=
//                       '<div class="imgBox">' +
//                       '<img src="' +
//                       data.Image +
//                       '" />' +
//                       '<div class="title">' +
//                       data.Heading +
//                       "</div>" +
//                       "</div>";
//                   }
//                 }

//                 ChatBot.addChatEntry(content, "bot");
//                 ChatBot.thinking(false);
//               });
//             },
//             getCapabilities: function () {
//               return capabilities;
//             },
//             getSuggestUrl: function () {
//               return null;
//             },
//           };
//         },
//       },
//       init: function (options) {
//         let settings = $.extend(
//           {
//             // these are the defaults.
//             botName: "Bot",
//             humanName: "You",
//             thinkingHtml:
//               '<img src="data:image/gif;base64,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"/>',
//             inputs: "",
//             inputCapabilityListing: true,
//             engines: [],
//             patterns: [],
//             normalizer: [],
//             addChatEntryCallback: function (entryDiv, text, origin) {
//               entryDiv.addClass("appear");
//             },
//           },
//           options
//         );

//         botName = settings.botName;
//         humanName = settings.humanName;
//         thinkingHtml = settings.thinkingHtml;
//         inputs = settings.inputs;
//         inputCapabilityListing = settings.inputCapabilityListing;
//         engines = settings.engines;
//         patterns = settings.patterns;
//         addChatEntryCallback = settings.addChatEntryCallback;
//         normalizer = settings.normalizer;

//         // update the command description
//         updateCommandDescription();

//         // input capability listing?
//         if (inputCapabilityListing) {
//           $(inputs).attr("list", "chatBotCommands");
//         }

//         // listen to inputs on the defined fields
//         $(inputs).keyup(function (e) {
//           if (e.keyCode == 13) {
//             ChatBot.addChatEntry($(this).val(), "human");
//             ChatBot.react($(this).val());
//           }
//           //console.log($(this).val());
//         });
//       },
//       setBotName: function (name) {
//         botName = name;
//       },
//       setHumanName: function (name) {
//         humanName = name;
//         $(".chatBotChatEntry.human .origin").html(name);
//       },
//       addChatEntry: function addChatEntry(text, origin) {
//         if (text == undefined) {
//           return;
//         }
//         if (text == "") {
//           text = "Sorry, I have no idea.";
//         }
//         let entryDiv = $('<div class="chatBotChatEntry ' + origin + '"></div>');
//         entryDiv.html(
//           '<span class="origin">' +
//             (origin == "bot" ? botName : humanName) +
//             "</span>" +
//             text
//         );
//         $("#chatBotHistory").prepend(entryDiv);
//         if (addChatEntryCallback != undefined) {
//           addChatEntryCallback.call(this, entryDiv, text, origin);
//         }
//       },
//       thinking: function (on) {
//         let ti = $("#chatBotThinkingIndicator");
//         if (on) {
//           if (!sampleConversationRunning) {
//             $(inputs).attr("disabled", "disabled");
//           }
//           ti.html(thinkingHtml);
//         } else {
//           if (!sampleConversationRunning) {
//             $(inputs).removeAttr("disabled");
//             $(inputs).val("");
//             $(inputs).focus();
//           }
//           ti.html("");
//         }
//       },
//       react: function react(text) {
//         this.thinking(true);

//         // normalize the human text
//         normalizer.map((method) => {
//           if (String.prototype[method] instanceof Function) {
//             // string immuable object
//             text = text[method]();
//           } else if (method instanceof Function) {
//             text = method(text) || text;
//           }
//         });

//         // check for custom patterns
//         for (let i = 0; i < patterns.length; i++) {
//           let pattern = patterns[i];
//           let r = new RegExp(pattern.regexp, "i");
//           let matches = text.match(r);
//           //console.log(matches);
//           if (matches) {
//             switch (pattern.actionKey) {
//               case "rewrite":
//                 text = pattern.actionValue;
//                 for (let j = 1; j < matches.length; j++) {
//                   text = text.replace("$" + j, matches[j]);
//                 }
//                 //console.log("rewritten to " + text);
//                 if (pattern.callback != undefined) {
//                   pattern.callback.call(this, matches);
//                 }
//                 break;
//               case "response":
//                 //                                let response = text.replace(r, pattern.actionValue);
//                 let response = pattern.actionValue;
//                 if (response != undefined) {
//                   for (let j = 1; j < matches.length; j++) {
//                     response = response.replace("$" + j, matches[j]);
//                   }
//                   this.addChatEntry(response, "bot");
//                 }
//                 ChatBot.thinking(false);
//                 if (pattern.callback != undefined) {
//                   pattern.callback.call(this, matches);
//                 }
//                 return;
//             }
//             break;
//           }
//         }

//         for (let e = 0; e < engines.length; e++) {
//           let engine = engines[e];
//           engine.react(text);
//         }
//       },
//       playConversation: function (conversation, pauseLength) {
//         if (pauseLength == undefined) {
//           pauseLength = 3000;
//         }

//         if (sampleConversationRunning) {
//           return false;
//         }

//         $(inputs).val("");

//         sampleConversationRunning = true;

//         let state = {
//           start: 0,
//           conversationArrayIndex: 0,
//           conversationArray: conversation,
//           currentInput: conversation[0],
//         };

//         playConversation(state, pauseLength);

//         return true;
//       },
//       addPatternObject: function (obj) {
//         patterns.push(obj);
//         updateCommandDescription();
//       },
//       addPattern: function (
//         regexp,
//         actionKey,
//         actionValue,
//         callback,
//         description
//       ) {
//         let obj = {
//           regexp: regexp,
//           actionKey: actionKey,
//           actionValue: actionValue,
//           description: description,
//           callback: callback,
//         };
//         this.addPatternObject(obj);
//       },
//     };
//   })();

//   let sampleConversation = [
//     "Hi",
//     "My name is Fry",
//     "Where is China?",
//     "What is the population of China?",
//     "Bye",
//   ];
//   let config = {
//     botName: "Duck Duck Go Bot",
//     inputs: "#humanInput",
//     inputCapabilityListing: true,
//     engines: [ChatBot.Engines.duckduckgo()],
//     normalizer: [
//       function (text) {
//         return text.replace("!", "");
//       },
//       "trim",
//     ],
//     addChatEntryCallback: function (entryDiv, text, origin) {
//       entryDiv.delay(200).slideDown();
//     },
//   };
//   ChatBot.init(config);
//   ChatBot.setBotName("Duck Duck Go Bot");
//   ChatBot.addPattern(
//     "^hi$",
//     "response",
//     "Howdy, friend",
//     undefined,
//     "Say 'Hi' to be greeted back."
//   );
//   ChatBot.addPattern(
//     "^bye$",
//     "response",
//     "See you later buddy",
//     undefined,
//     "Say 'Bye' to end the conversation."
//   );
//   ChatBot.addPattern(
//     "(?:my name is|I'm|I am) (.*)",
//     "response",
//     "hi $1, thanks for talking to me today",
//     function (matches) {
//       ChatBot.setHumanName(matches[1]);
//     },
//     "Say 'My name is [your name]' or 'I am [name]' to be called that by the bot"
//   );
//   ChatBot.addPattern(
//     "(what is the )?meaning of life",
//     "response",
//     "42",
//     undefined,
//     "Say 'What is the meaning of life' to get the answer."
//   );
//   ChatBot.addPattern(
//     "compute ([0-9]+) plus ([0-9]+)",
//     "response",
//     undefined,
//     function (matches) {
//       ChatBot.addChatEntry(
//         "That would be " + (1 * matches[1] + 1 * matches[2]) + ".",
//         "bot"
//       );
//     },
//     "Say 'compute [number] plus [number]' to make the bot your math monkey"
//   );

//   return (
//     <div id="demo">
//       <div id="chatBotCommandDescription"></div>
//       <input id="humanInput" type="text" placeholder="Say something" />

//       <div
//         className="button"
//         onClick={() => {
//           if (!ChatBot.playConversation(sampleConversation, 4000)) {
//             alert("conversation already running");
//           }
//         }}
//       >
//         Play sample conversation!
//       </div>
//       <div
//         className="button"
//         onClick={() => {
//           $("#chatBotCommandDescription").slideToggle();
//         }}
//         style={{ marginRight: "10px" }}
//       >
//         What can I say?
//       </div>

//       <div style={{ clear: "both" }}>&nbsp;</div>

//       <div id="chatBot">
//         <div id="chatBotThinkingIndicator"></div>
//         <div id="chatBotHistory"></div>
//       </div>
//     </div>
//   );
// };
