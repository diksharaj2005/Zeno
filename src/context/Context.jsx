import { createContext, useState } from "react";
import main from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recPrompt, setRecPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }



    const Sent = async (prompt) => {
        setResData("");
        setLoading(true);
        setShowResult(true);

        const currentInput = prompt ?? input;
        const lowerInput = currentInput.toLowerCase();

        const nameQueries = [
            "your name", "what's your name", "who are you",
            "tell me your name", "name please", "name"
        ];


        if (nameQueries.some(q => lowerInput.includes(q))) {
            setResData("My name is <b>Zeno</b> 😊");
            setLoading(false);
            setInput("");
            return;
        }


        if (!prompt) {
            setPrevPrompt(prev => [...prev, input]);
        }

        setRecPrompt(currentInput);

        try {
            const response = await main(currentInput);

            let resArray = response.split("**");
            let formatted = "";
            for (let i = 0; i < resArray.length; i++) {
                formatted += i % 2 === 1 ? `<b>${resArray[i]}</b>` : resArray[i];
            }

            formatted = formatted
                .replace(/google/gi, "Diksha")
                .replace(/gemini/gi, "Zeno")
                .replace(/\*/g, "<br/>");

            const words = formatted.split(" ");
            words.forEach((word, index) => delayPara(index, word + " "));
        } catch (err) {
            setResData("Oops! Something went wrong. Please try again.");
        }

        setLoading(false);
        setInput("");
    };
    const handleFileUpload = async (file) => {
        setResData("");
        setLoading(true);
        setShowResult(true);

        try {
            // Read the file content
            const reader = new FileReader();
            reader.onload = async () => {
                const fileContent = reader.result;

                const filePrompt = `Please read and analyze the following file content:\n${fileContent}`;
                setRecPrompt(file.name);

                const response = await main(filePrompt);

                let resArray = response.split("**");
                let formatted = "";
                for (let i = 0; i < resArray.length; i++) {
                    formatted += i % 2 === 1 ? `<b>${resArray[i]}</b>` : resArray[i];
                }

                formatted = formatted
                    .replace(/google/gi, "Diksha")
                    .replace(/gemini/gi, "Zeno")
                    .replace(/\*/g, "<br/>");

                const words = formatted.split(" ");
                words.forEach((word, index) => delayPara(index, word + " "));
            };

            // Text and JSON files only for now
            if (file.type.startsWith("text/") || file.type === "application/json") {
                reader.readAsText(file);
            } else {
                setResData("Unsupported file format. Please upload a text or JSON file.");
                setLoading(false);
            }
        } catch (err) {
            setResData("Error processing the file.");
            setLoading(false);
        }
    };


    const Value = {
        prevPrompt,
        setPrevPrompt,
        Sent,
        setRecPrompt,
        showResult,
        loading,
        resData,
        input,
        setInput,
        recPrompt,
        newChat,
        handleFileUpload
    };

    return (
        <Context.Provider value={Value}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
