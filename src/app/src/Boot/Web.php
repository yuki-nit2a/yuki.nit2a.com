<?php
namespace Nit2a\Yuki\Boot;

class Web
{
    public static function run()
    {
        ini_set('display_errors', 1);

        try {
            include __DIR__ . '/../View/Index.php';
        } catch (Exception $e) {
            return false;
        }

        return true;
    }
}
