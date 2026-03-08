<?php
$files = glob("images/*.{jpg,png,jpeg}", GLOB_BRACE);
echo json_encode($files);
?>