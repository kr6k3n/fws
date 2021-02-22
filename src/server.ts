import * as express from "express";
import redisClient from "./redisclient";

const app = express();


app.get("/", (req, res) => {
    let key;
    try {
        key = req.query.key.toString();
    } catch (error) {
        res.status(400).end();
        return;
    }

    redisClient.get(key, (err, value) => {
        if (err)
            res.status(500).send(JSON.stringify(err))
        else {
            if (!value)
                res.status(404).end()
            else
                res.status(200).send(value);
        }
    });
});

app.post("/", (req, res)=> {
    let key,value;
    try {
        key = req.query.key.toString()
        value = req.query.value.toString()
    } catch (error) {
        res.status(400).end();
        return;
    }
    redisClient.set(key , value , (err) => {
        if (err)
            res.status(500).send('Server Error')
        else
            res.status(200).end();
    });

});

app.listen(process.env.PORT || 5000, () => {
    console.info("app started");
});

