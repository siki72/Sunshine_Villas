import { createConnexion } from "./connexion.js";

(async () => {
  try {
    const co = await createConnexion();
    await co.query("DROP TABLE IF EXISTS cards ");

    // { name: max-people: area: des:   }

    await co.query(`CREATE TABLE IF NOT EXISTS cards(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            max_guests INT NOT NULL,
            area INT NOT NULL,
            infos VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            link VARCHAR(255) NOT NULL
        ) `);

    co.query(`INSERT INTO cards (name, max_guests, area, infos, url, link)
            
            VALUES
                 ("1-BED-APARTEMENT", 2, 40, "Modern apartements with a private balcony overlooking the ocean, Perfect for couples.", "https://i.postimg.cc/g066x36v/card2.png", "/1-bed-apartement"),
                 ("2-BED-VILLA", 5, 90, "Villas designed for perfect and relaxing holidays, The ideal choice for those searching for a tropical home away from home.", "https://i.postimg.cc/SK10XzCf/card1.jpg", "/2-bed-villa"),
                 ("3-BED-VILLA", 7, 160, "Luxurious, tastefully decorated, and spacious villas providing stunning Ocean Views, The perfect base for a memorable vacation.", "https://i.postimg.cc/9FDDzG9J/card3.jpg", "/3-bed-villa")
            
        `);

    // Reviews Tables

    await co.query("DROP TABLE IF EXISTS reveiws ");

    // { name: max-people: area: des:   }

    await co.query(`CREATE TABLE IF NOT EXISTS reveiws(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            link VARCHAR(255) NOT NULL
        ) `);

    co.query(`INSERT INTO reveiws (name, content, link)
            
            VALUES
                 ("Maxim Vianey", "I stayed one week in this place. The villa is big with a nice pool and access to the beach. The restaurant is a short walk away", "https://i.postimg.cc/kM1chpzf/guest-1.png"),
                 ("Remy & karin", "Very nice stay in Jambiani Villas. We were in the large apartment on first floor, with sea view. Staff is very friendly, good food.", "https://i.postimg.cc/FKVbbW0b/guest-2.png"),
                 ("Przemysław ", "The place is simply amazing. It is located in the heart of Jambiani by the very nice beach", "https://i.postimg.cc/rmy1f19B/guest-3.png"),
                 ("lilas" ,"They really know how to manage such lovely place. The sites close one to the other.", "https://i.postimg.cc/Kz9nw1qR/guest-4.png")    
            
        `);

    await co.query("DROP TABLE IF EXISTS users ");

    await co.query(`CREATE TABLE IF NOT EXISTS users(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT NOW()
            
        ) `);

    await co.query("DROP TABLE IF EXISTS  villas");

    await co.query(`CREATE TABLE IF NOT EXISTS villas(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT NOW()
         


        ) `); //            FOREIGN KEY(reservation_id) REFERENCES reservations(id)  enlevé depuis villas    FOREIGN KEY(guest_id) REFERENCES users(id)
    co.query(`INSERT INTO villas (name, price)
            
            VALUES
                 ("1 BEDROOM APARTMENT", 75),
                 ("2 BEDROOM VILLA", 95),
                 ("3 BEDROOM VILLA", 120)

            
        `);

    await co.query("DROP TABLE IF EXISTS  reservations");

    await co.query(`CREATE TABLE IF NOT EXISTS reservations(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            guest_id INT NOT NULL,
            villa_id INT NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_price INT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT NOW(),
            FOREIGN KEY(guest_id) REFERENCES users(id),
            FOREIGN KEY(villa_id) REFERENCES villas(id)

        ) `);

    await co.close();
  } catch (e) {
    console.error(e.message);
  }
})();
