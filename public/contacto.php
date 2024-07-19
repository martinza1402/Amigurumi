<?php
include 'view/header.php';
?>

<main>
    <div class="formulario-contacto">
        <h2>Formulario de Contacto</h2>
        <form action="procesar_contacto.php" method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />

            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" name="correo" required />

            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" required />

            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="5" required></textarea>

            <button type="submit">Enviar</button>
        </form>
    </div>
</main>

</body>
</html>

<?php
include 'view/footer.php';
?>