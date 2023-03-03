import { createConnexion } from "./connexion.js";

 
(async () => {
    try {
        const co = await createConnexion()
        await co.query("DROP TABLE IF EXISTS cards ");

        // { name: max-people: area: des:   }

        await co.query(`CREATE TABLE IF NOT EXISTS cards(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            max_guests INT NOT NULL,
            area INT NOT NULL,
            infos VARCHAR(255) NOT NULL
        ) `);

        co.query(`INSERT INTO cards (name, max_guests, area, infos)
            
            VALUES
                 ("1-BED-APARTEMENT", 2, 40, "Modern apartements with a private balcony overlooking the ocean, Perfect for couples."),
                 ("2-BED-VILLA", 5, 90, "Villas designed for perfect and relaxing holidays, The ideal choice for those searching for a tropical home away from home."),
                 ("3-BED-VILLA", 7, 160, "Luxurious, tastefully decorated, and spacious villas providing stunning Ocean Views, The perfect base for a memorable vacation.")
            
        `);
        await co.close()

    } catch(e) {
        console.error(e.message)
    }
})()