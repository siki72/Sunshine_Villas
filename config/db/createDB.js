import { createConnexion } from "./connexion.js";

(async () => {
  try {
    const co = await createConnexion();
    await co.query("DROP TABLE IF EXISTS villas ");

    await co.query(`CREATE TABLE IF NOT EXISTS villas(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            max_guests INT NOT NULL,
            area INT NOT NULL,
            price INT NOT NULL,
            infos VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            link VARCHAR(255) NOT NULL,
             created_at DATETIME NOT NULL DEFAULT NOW()
        ) `);

    co.query(`INSERT INTO villas (name, max_guests, area, price, infos, url, link)
            
            VALUES
                 ("1-BED-APARTEMENT", 2, 40, 75, "Modern apartements with a private balcony overlooking the ocean, Perfect for couples.", "https://i.postimg.cc/5tvXMsdb/ezgif-com-gif-maker.webp", "/1-bed-apartement"),
                 ("2-BED-VILLA", 5, 90, 95,  "Villas designed for perfect and relaxing holidays, The ideal choice for those searching for a tropical home away from home.", "https://i.postimg.cc/SK10XzCf/card1.jpg", "/2-bed-villa"),
                 ("3-BED-VILLA", 7, 160, 125, "Luxurious, tastefully decorated, and spacious villas providing stunning Ocean Views, The perfect base for a memorable vacation.", "https://i.postimg.cc/9FDDzG9J/card3.jpg", "/3-bed-villa")
            
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
            role VARCHAR(255) NOT NULL DEFAULT 'guest',
            phone VARCHAR(255),
            location VARCHAR(255),
            reservations_count INT,
            profits INT NOT NULL DEFAULT "0",
            confirmation_code VARCHAR(255),
            confirmed BOOLEAN NOT NULL DEFAULT FALSE,
            created_at DATETIME NOT NULL DEFAULT NOW()
            
        ) `);

    await co.query("DROP TABLE IF EXISTS  reservations");

    await co.query(`CREATE TABLE IF NOT EXISTS reservations(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            guest_id INT NOT NULL,
            villa_id INT NOT NULL,
            start_date VARCHAR(255) NOT NULL,
            end_date VARCHAR(255) NOT NULL,
            nights INT NOT NULL,
            total_price INT NOT NULL,
            selected_dates LONGTEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT NOW(),
            FOREIGN KEY(guest_id) REFERENCES users(id),
            FOREIGN KEY(villa_id) REFERENCES villas(id)

        ) `);

    await co.query("DROP TABLE IF EXISTS  walima");

    await co.query(`CREATE TABLE IF NOT EXISTS walima(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            guests INT NOT NULL,
            date VARCHAR(255) NULL,
            created_at DATETIME NOT NULL DEFAULT NOW()


        ) `);

    await co.query("DROP TABLE IF EXISTS  errors_logs");

    await co.query(`CREATE TABLE IF NOT EXISTS errors_logs(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            url VARCHAR(255),
            message TEXT,
            user INT,
            stackTrace TEXT,
            created_at DATETIME NOT NULL DEFAULT NOW(),
            FOREIGN KEY(user) REFERENCES users(id)
        ) `);
    await co.close();
  } catch (e) {
    console.error(e.message);
  }
})();
