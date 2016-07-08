<?php
namespace Nit2a\Yuki\Boot;

class Web
{
    public static function run()
    {
        try {
            include __DIR__ . '/../View/Index.php';
            return true;
        } catch (\Exception $e) {
            Logger::error($e->getMessage());
        }

        return false;
    }
}
